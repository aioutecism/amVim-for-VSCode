import {window, Range} from 'vscode';
import {ActionReveal} from './Reveal';

export class ActionJoinLines {

    static onSelections(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        return activeTextEditor.edit((editBuilder) => {
            const joinLineUnder = (line: number): void => {
                if (line >= activeTextEditor.document.lineCount - 1) {
                    return;
                }

                const thisLine = activeTextEditor.document.lineAt(line).text;
                const nextLine = activeTextEditor.document.lineAt(line + 1).text;

                const thisLineTrimLength = (() => {
                    const matches = thisLine.match(/\s+$/);
                    return matches ? matches[0].length : 0;
                })();
                const nextLineTrimLength = (() => {
                    const matches = nextLine.match(/^\s+/);
                    return matches ? matches[0].length : 0;
                })();

                editBuilder.replace(new Range(
                    line, thisLine.length - thisLineTrimLength,
                    line + 1, nextLineTrimLength
                ), ' ');
            };

            let linesToJoin: {[line: number]: number} = {};

            activeTextEditor.selections.forEach(selection => {
                if (selection.isSingleLine) {
                    linesToJoin[selection.active.line] = selection.active.line;
                }
                else {
                    for (let line = selection.start.line; line < selection.end.line; line++) {
                        linesToJoin[line] = line;
                    }
                }
            });

            Object.getOwnPropertyNames(linesToJoin).forEach(key => {
                joinLineUnder(linesToJoin[key]);
            });
        })
            .then(ActionReveal.primaryCursor);
    }

}
