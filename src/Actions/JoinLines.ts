import {window, Range} from 'vscode';
import {ActionReveal} from './Reveal';
import {UtilRange} from '../Utils/Range';

export class ActionJoinLines {

    static onSelections(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        return activeTextEditor.edit((editBuilder) => {
            const rangeByLine = (line: number): Range => {
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

                return new Range(
                    line, thisLine.length - thisLineTrimLength,
                    line + 1, nextLineTrimLength
                );
            };

            let linesToJoin: number[] = [];
            activeTextEditor.selections.forEach(selection => {
                if (selection.isSingleLine) {
                    linesToJoin.push(selection.active.line);
                }
                else {
                    for (let line = selection.start.line; line < selection.end.line; line++) {
                        linesToJoin.push(line);
                    }
                }
            });

            let ranges: Range[] = [];
            linesToJoin.forEach(line => {
                const range = rangeByLine(line);
                if (range) {
                    ranges.push(range);
                }
            });

            ranges = UtilRange.unionOverlaps(ranges);

            ranges.forEach(range => {
                editBuilder.replace(range, ' ');
            });
        })
            .then(ActionReveal.primaryCursor);
    }

}
