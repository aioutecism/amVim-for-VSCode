import {window, Range, Selection, Position} from 'vscode';
import {StaticReflect} from '../LanguageExtensions/StaticReflect';
import {SymbolMetadata} from '../Symbols/Metadata';
import {ActionReveal} from './Reveal';
import {UtilRange} from '../Utils/Range';

export class ActionJoinLines {

    @StaticReflect.metadata(SymbolMetadata.Action.isChange, true)
    static onSelections(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        return activeTextEditor.edit((editBuilder) => {
            const rangeByLine = (line: number): Range | null => {
                if (line >= activeTextEditor.document.lineCount - 1) {
                    return null;
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

            // move to the space between the last two joined lines
            linesToJoin.sort();
            const lastLine = linesToJoin[linesToJoin.length - 1];
            const char = activeTextEditor.document.lineAt(lastLine).text.length;
            const position = new Position(lastLine, char)
            activeTextEditor.selection = new Selection(position, position);
        })
            .then(() => ActionReveal.primaryCursor());
    }

}
