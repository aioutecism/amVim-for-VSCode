
import * as assert from 'assert';
import leftRightMotion from './testSets/LeftRightMotions';
import * as TestUtil from './Util';
import {TextEditor, Selection, Position, window, commands} from 'vscode';
import {VimTest} from './testSets/VimTest';

export function run() {

    let testSets = [leftRightMotion];

    let editor;

    setup((done) => {
        TestUtil.createTempDocument().then(e => {
            editor = e;
            done();
        });
    });

    // NOTE: All actions operate on activeEditor therefore tests must be run in series
    asyncSeries(testSets, (set, testSetDone) => {
        asyncSeries(set.tests, (vimTest, vimTestDone) => {

            // Hack to run multiple tests inside async code...
            suite('', () => {
                test(vimTest.name, (done) => {
                    runTest(editor, vimTest)
                        .then(() => done(), done)
                        .then(() => vimTestDone(), () => vimTestDone());
                });
            });

        }).then(() => testSetDone(), () => testSetDone());
    });
}

function runTest(editor: TextEditor, vimTest: VimTest) {

    return initializeEditor(editor, vimTest.inText)
        .then(() => applySelections(editor, vimTest.inSelections))
        .then(() => executeCommand(editor, vimTest.command))
        .then(() => {
            assert(isSelectionsEqual(vimTest.outSelections, editor.selections));
            assert.equal(vimTest.outText, editor.document.getText());
        });
}

function applySelections(editor: TextEditor, selections: Selection[]) {
    editor.selections = selections;

    return new Promise<void>((resolve, reject) => {
        window.onDidChangeTextEditorSelection((e) => {
            if (isSelectionsEqual(e.selections, selections)) {
                resolve();
            }
        });
    });
}

export function isSelectionsEqual(s1: Selection[], s2: Selection[]) {
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

function initializeEditor(editor: TextEditor, text: string) {
    let lastLine = editor.document.lineAt(editor.document.lineCount - 1);

    let editorRange = lastLine.rangeIncludingLineBreak.with(new Position(0, 0));

    return editor.edit(editBuilder => {
        editBuilder.delete(editorRange);
        editBuilder.insert(new Position(0, 0), text);
    });
}

// NOTE: It's currently not possible to hook into the dispatcher
// Therefore it cannot be gauranteed that the test will be finished before the next test starts!
function executeCommand(editor: TextEditor, command: string) {
    return asyncSeries(command.split(''), (letter, done) => {
        commands.executeCommand('type', { text: letter }).then(() => done(), done);
    });
}

function asyncSeries<T>(arr: T[], iterator: (item: T, done) => void): Promise<void> {
    let queue = arr.slice(0);

    return new Promise<void>((resolve, reject) => {
        function done(err?: any) {

            if (err) {
                reject(err);
                return;
            }

            if (queue.length === 0) {
                resolve();
                return;
            }

            iterator(queue.shift(), done);
        }

        done();
    });
}