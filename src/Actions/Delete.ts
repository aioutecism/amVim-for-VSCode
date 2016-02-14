import {window, commands, Range} from 'vscode';
import {ActionRegister} from './Register';
import {ActionReveal} from './Reveal';
import {Motion} from '../Motions/Motion';
import {UtilRange} from '../Utils/Range';

export class ActionDelete {

    static byMotions(args: {
        motions: Motion[],
        cwNeedsFixup?: boolean,
        shouldYank?: boolean
    }): Thenable<boolean> {
        args.cwNeedsFixup = args.cwNeedsFixup === undefined ? false : args.cwNeedsFixup;
        args.shouldYank = args.shouldYank === undefined ? false : args.shouldYank;

        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        let ranges = activeTextEditor.selections.map(selection => {
            const start = selection.active;
            const end = args.motions.reduce((position, motion) => {
                return motion.apply(position, {isInclusive: true, cwNeedsFixup: args.cwNeedsFixup});
            }, start);
            return new Range(start, end);
        });

        ranges = ranges.map(range => {
            return range.isSingleLine ? range : UtilRange.toLinewise(range);
        })

        ranges = UtilRange.unionOverlaps(ranges);

        // TODO: Move cursor to first non-space if needed

        return (args.shouldYank ? ActionRegister.yankRanges(ranges) : Promise.resolve(true))
            .then(() => {
                return activeTextEditor.edit((editBuilder) => {
                    ranges.forEach((range) => editBuilder.delete(range));
                });
            })
            .then(ActionReveal.primaryCursor);
    }

    static selectionsOrLeft(args: {
        isMultiLine?: boolean,
        shouldYank?: boolean
    } = {}): Thenable<boolean> {
        args.isMultiLine = args.isMultiLine === undefined ? false : args.isMultiLine;
        args.shouldYank = args.shouldYank === undefined ? false : args.shouldYank;

        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        let document = activeTextEditor.document;
        let ranges: Range[];

        if (args.isMultiLine) {
            ranges = activeTextEditor.selections.map(selection => {
                if (! selection.isEmpty) {
                    return selection;
                }

                let position = selection.active;

                if (position.character === 0) {
                    if (position.line === 0) {
                        return selection;
                    }
                    else {
                        let lineLength = document.lineAt(position.line - 1).text.length;
                        return new Range(
                            position.translate(-1, lineLength),
                            position
                        );
                    }
                }
                else {
                    return new Range(selection.active, selection.active.translate(0, -1));
                }
            });
        }
        else {
            ranges = activeTextEditor.selections.map(selection => {
                return selection.isEmpty && selection.active.character !== 0
                    ? new Range(selection.active, selection.active.translate(0, -1))
                    : selection;
            });
        }

        ranges = UtilRange.unionOverlaps(ranges);

        return (args.shouldYank ? ActionRegister.yankRanges(ranges) : Promise.resolve(true))
            .then(() => {
                return activeTextEditor.edit((editBuilder) => {
                    ranges.forEach((range) => editBuilder.delete(range));
                });
            })
            .then(ActionReveal.primaryCursor);
    }

    static selectionsOrRight(args: {
        isMultiLine?: boolean,
        shouldYank?: boolean
    } = {}): Thenable<boolean> {
        args.isMultiLine = args.isMultiLine === undefined ? false : args.isMultiLine;
        args.shouldYank = args.shouldYank === undefined ? false : args.shouldYank;

        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        let document = activeTextEditor.document;
        let ranges: Range[];

        if (args.isMultiLine) {
            ranges = activeTextEditor.selections.map(selection => {
                if (! selection.isEmpty) {
                    return selection;
                }

                let position = selection.active;
                let lineLength = document.lineAt(position.line).text.length;

                if (position.character === lineLength) {
                    if (position.line === document.lineCount - 1) {
                        return selection;
                    }
                    else {
                        return new Range(
                            position.line, position.character,
                            position.line + 1, 0
                        );
                    }
                }
                else {
                    return new Range(selection.active, selection.active.translate(0, +1));
                }
            });
        }
        else {
            ranges = activeTextEditor.selections.map(selection => {
                return selection.isEmpty
                    ? new Range(selection.active, selection.active.translate(0, +1))
                    : selection;
            });
        }

        ranges = UtilRange.unionOverlaps(ranges);

        return (args.shouldYank ? ActionRegister.yankRanges(ranges) : Promise.resolve(true))
            .then(() => {
                return activeTextEditor.edit((editBuilder) => {
                    ranges.forEach((range) => editBuilder.delete(range));
                });
            })
            .then(ActionReveal.primaryCursor);
    }

    static line(args: {
        shouldYank?: boolean
    }): Thenable<boolean> {
        args.shouldYank = args.shouldYank === undefined ? false : args.shouldYank;

        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        const document = activeTextEditor.document;

        let ranges = activeTextEditor.selections.map(selection => {
            return UtilRange.fitIntoDocument(document, new Range(
                selection.start.line, 0,
                selection.end.line + 1, 0
            ));
        });

        ranges = UtilRange.unionOverlaps(ranges);

        return (args.shouldYank ? ActionRegister.yankRanges(ranges) : Promise.resolve(true))
            .then(() => {
                return activeTextEditor.edit((editBuilder) => {
                    ranges.forEach((range) => editBuilder.delete(range));
                });
            })
            .then(ActionReveal.primaryCursor);
    }

};
