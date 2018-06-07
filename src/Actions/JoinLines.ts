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

            const targetPositions: Position[] = [];
            const linesToJoin: number[] = [];

            activeTextEditor.selections.forEach(selection => {
                if (selection.isSingleLine) {
                    const line = activeTextEditor.document.lineAt(selection.active.line);
                    targetPositions.push(new Position(line.lineNumber, line.text.length));

                    linesToJoin.push(line.lineNumber);
                }
                else {
                    const line = activeTextEditor.document.lineAt(selection.end.line - 1);
                    targetPositions.push(new Position(line.lineNumber, line.text.length));

                    for (let lineNumber = selection.start.line; lineNumber <= line.lineNumber; lineNumber++) {
                        linesToJoin.push(lineNumber);
                    }
                }
            });

            activeTextEditor.selections = targetPositions.map((position) => new Selection(position, position));

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
            .then(() => ActionReveal.primaryCursor());
    }

}
