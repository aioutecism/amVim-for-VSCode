import {window, Range, Selection} from 'vscode';
import {PrototypeReflect} from '../LanguageExtensions/PrototypeReflect';
import {SymbolMetadata} from '../Symbols/Metadata';
import {ActionRegister} from './Register';
import {ActionReveal} from './Reveal';
import {Motion} from '../Motions/Motion';
import {TextObject} from '../TextObjects/TextObject';
import {UtilRange} from '../Utils/Range';

export class ActionDelete {

    @PrototypeReflect.metadata(SymbolMetadata.Action.isChange, true)
    static byMotions(args: {
        motions: Motion[],
        isChangeAction?: boolean,
        shouldYank?: boolean
    }): Thenable<boolean> {
        args.isChangeAction = args.isChangeAction === undefined ? false : args.isChangeAction;
        args.shouldYank = args.shouldYank === undefined ? false : args.shouldYank;

        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        const document = activeTextEditor.document;

        let ranges = activeTextEditor.selections.map(selection => {
            const start = selection.active;
            const end = args.motions.reduce((position, motion) => {
                return motion.apply(position, {
                    isInclusive: true,
                    shouldCrossLines: false,
                    isChangeAction: args.isChangeAction,
                });
            }, start);
            return new Range(start, end);
        });

        if (args.motions.some(motion => motion.isLinewise)) {
            ranges = ranges.map(range => UtilRange.toLinewise(range, document));
        }

        ranges = UtilRange.unionOverlaps(ranges);

        // TODO: Move cursor to first non-space if needed

        return (args.shouldYank ? ActionRegister.yankRanges(ranges) : Promise.resolve(true))
            .then(() => {
                return activeTextEditor.edit((editBuilder) => {
                    ranges.forEach((range) => editBuilder.delete(range));
                });
            })
            .then(() => ActionReveal.primaryCursor());
    }

    @PrototypeReflect.metadata(SymbolMetadata.Action.isChange, true)
    static byTextObject(args: {
        textObject: TextObject,
        shouldYank?: boolean
    }): Thenable<boolean> {
        args.shouldYank = args.shouldYank === undefined ? false : args.shouldYank;

        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        let ranges: Range[] = [];

        activeTextEditor.selections.forEach(selection => {
            const match = args.textObject.apply(selection.active);
            if (match) {
                ranges.push(match);
            }
        });

        ranges = UtilRange.unionOverlaps(ranges);

        if (ranges.length === 0) {
            return Promise.reject<boolean>(false);
        }

        // Selections will be adjust to matched ranges' start.
        activeTextEditor.selections = ranges.map(range => new Selection(range.start, range.start));

        return (args.shouldYank ? ActionRegister.yankRanges(ranges) : Promise.resolve(true))
            .then(() => {
                return activeTextEditor.edit((editBuilder) => {
                    ranges.forEach((range) => editBuilder.delete(range));
                });
            })
            .then(() => ActionReveal.primaryCursor());
    }

    @PrototypeReflect.metadata(SymbolMetadata.Action.isChange, true)
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
            .then(() => ActionReveal.primaryCursor());
    }

    @PrototypeReflect.metadata(SymbolMetadata.Action.isChange, true)
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
            .then(() => ActionReveal.primaryCursor());
    }

    @PrototypeReflect.metadata(SymbolMetadata.Action.isChange, true)
    static byLines(args: {
        shouldYank?: boolean
    }): Thenable<boolean> {
        args.shouldYank = args.shouldYank === undefined ? false : args.shouldYank;

        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        const document = activeTextEditor.document;

        let ranges = activeTextEditor.selections.map(selection => UtilRange.toLinewise(selection, document));

        ranges = UtilRange.unionOverlaps(ranges);

        return (args.shouldYank ? ActionRegister.yankRanges(ranges) : Promise.resolve(true))
            .then(() => {
                return activeTextEditor.edit((editBuilder) => {
                    ranges.forEach((range) => editBuilder.delete(range));
                });
            })
            .then(() => ActionReveal.primaryCursor());
    }

};
