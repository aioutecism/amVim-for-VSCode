
import * as assert from 'assert';
import * as TestUtil from './Util';
import {TextEditor, Selection, Position, window, commands} from 'vscode';
import {VimTest, TestSet} from './testSets/VimTest';
import * as Keys from '../src/Keys';

export function run(testSets: TestSet[]) {

    let editor;

    setup((done) => {
        TestUtil.createTempDocument().then(e => {
            editor = e;
            done();
        });
    });

    testSets.forEach(testSet => {
        testSet.tests.forEach(vimTest => {
            test(vimTest.name, done => {
                runTest(editor, vimTest).then(done, done);
            });
        });
    });
}

function runTest(editor: TextEditor, vimTest: VimTest): Thenable<void> {

    return initializeEditor(editor, vimTest.inText)
        .then(() => commands.executeCommand('amVim.escape'))
        .then(() => applySelections(editor, vimTest.inSelections))
        .then(() => executeCommand(editor, vimTest.command))
        .then(() => {
            assert(isSelectionsEqual(vimTest.outSelections, editor.selections));
            assert.equal(vimTest.outText, editor.document.getText());
        });
}

function applySelections(editor: TextEditor, selections: Selection[]): Promise<void> {
    editor.selections = selections;

    return new Promise<void>((resolve, reject) => {
        window.onDidChangeTextEditorSelection((e) => {
            if (isSelectionsEqual(e.selections, selections)) {
                resolve();
            }
        });
    });
}

function isSelectionsEqual(s1: Selection[], s2: Selection[]): boolean {
    if (s1.length !== s2.length) {
        return false;
    }

    for (let i = 0; i < s1.length; i++) {
        if (!s1[i].isEqual(s2[i])) {
            return false;
        }
    }

    return true;
}

function initializeEditor(editor: TextEditor, text: string): Thenable<boolean> {
    let lastLine = editor.document.lineAt(editor.document.lineCount - 1);

    let editorRange = lastLine.rangeIncludingLineBreak.with(new Position(0, 0));

    return editor.edit(editBuilder => {
        editBuilder.delete(editorRange);
        editBuilder.insert(new Position(0, 0), text);
    });
}

function executeCommand(editor: TextEditor, commandSeq: string): Thenable<{}> {

    let promise = Promise.resolve<{}>({});

    splitCommandSeq(commandSeq).forEach(command => {
        if (command.indexOf('amVim') !== -1) {
            promise = promise.then(() => commands.executeCommand(command));
        } else {
            promise = promise.then(() => commands.executeCommand('type', { text: command }));
        }
    });

    return promise;
}

function splitCommandSeq(commandSeq: string): string[] {

    let keys = Keys.raws.reduce((acc, key) => {
        if (acc === '') {
            return `amVim.${key}`;
        } else {
            return `${acc}|amVim.${key}`;
        }
    }, '');

    // Use raw keys as delimeter and keep delimeter
    let keyRegex = new RegExp(`(.*?${keys})`, 'g');

    let commandSeqArr = commandSeq.split(keyRegex);

    return commandSeqArr.reduce((acc, c) => {
        if (c === '') {
            return acc;
        } else if (c.indexOf('amVim') !== -1) {
            return acc.concat(c);
        }

        return acc.concat(c.split(''));
    }, []);
}