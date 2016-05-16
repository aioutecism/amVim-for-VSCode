
import * as assert from 'assert';
import {TextEditor, Selection, Range, Position, window, commands, workspace} from 'vscode';
import {VimTest, TestSet} from './testSets/VimTest';
import * as Keys from '../src/Keys';

export class Runner {

    run(testSet: TestSet) {
        suite(testSet.name, () => {
            testSet.tests.forEach(vimTest => {
                test(vimTest.name, done => {
                    this.runTest(window.activeTextEditor, vimTest).then(done, done);
                });
            });
        });
    }

    private runTest(editor: TextEditor, vimTest: VimTest): Thenable<void> {

        return this.initializeEditor(editor, vimTest.inText)
            .then(() => commands.executeCommand('amVim.escape'))
            .then(() => this.applySelections(editor, vimTest.inSelections))
            .then(() => this.executeCommand(editor, vimTest.command))
            .then(() => {
                assert(this.isSelectionsEqual(vimTest.outSelections, editor.selections));
                assert.equal(vimTest.outText, editor.document.getText());
            });
    }

    private applySelections(editor: TextEditor, selections: Selection[]): Promise<void> {
        editor.selections = selections;

        return new Promise<void>((resolve, reject) => {
            window.onDidChangeTextEditorSelection((e) => {
                if (this.isSelectionsEqual(e.selections, selections)) {
                    resolve();
                }
            });
        });
    }

    private isSelectionsEqual(s1: Selection[], s2: Selection[]): boolean {
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

    private initializeEditor(editor: TextEditor, text: string): Thenable<boolean> {
        return editor.edit(editBuilder => {
            editBuilder.replace(new Range(0, 0, Number.MAX_VALUE, Number.MAX_VALUE), text);
        });
    }

    private executeCommand(editor: TextEditor, commandSeq: string): Thenable<{}> {

        let promise = Promise.resolve<{}>({});

        this.splitCommandSeq(commandSeq).forEach(command => {
            if (command.indexOf('amVim') !== -1) {
                promise = promise.then(() => commands.executeCommand(command));
            } else {
                promise = promise.then(() => commands.executeCommand('type', { text: command }));
            }
        });

        return promise;
    }

    private splitCommandSeq(commandSeq: string): string[] {

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
}