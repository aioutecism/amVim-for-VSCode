import {window, Position, Range} from 'vscode';
import {StaticReflect} from '../LanguageExtensions/StaticReflect';
import {SymbolMetadata} from '../Symbols/Metadata';
import {ActionMoveCursor} from './MoveCursor';
import {ActionSelection} from './Selection';
import {Motion} from '../Motions/Motion';
import {MotionCharacter} from '../Motions/Character';
import {MotionLine} from '../Motions/Line';
import {TextObject} from '../TextObjects/TextObject';
import {UtilRange} from '../Utils/Range';

export class Register {
    readonly content: string;
    readonly isLinewise: boolean;

    constructor(args: {
        content: string,
        isLinewise?: boolean
    }) {
        this.content = args.content;
        this.isLinewise = args.isLinewise === undefined ? false : args.isLinewise;
    }
}

export class ActionRegister {

    private static stash: Register;

    static GetStash(): Register {
        return ActionRegister.stash;
    }

    static SetStash(input: Register) {
        ActionRegister.stash = input;
    }

    static yankRanges(ranges: Range[]): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        const document = activeTextEditor.document;

        const content = ranges.map(range => {
            return document.getText(document.validateRange(range));
        }).join('');

        ActionRegister.stash = new Register({
            content: content,
        });

        return Promise.resolve(true);
    }

    static yankByMotions(args: {
        motions: Motion[],
        isChangeAction?: boolean,
    }): Thenable<boolean> {
        args.isChangeAction = args.isChangeAction === undefined ? false : args.isChangeAction;

        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        const document = activeTextEditor.document;
        const isLinewise = args.motions.some(motion => motion.isLinewise);

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

        if (isLinewise) {
            ranges = ranges.map(range => UtilRange.toLinewise(range, document));
        }

        ranges = UtilRange.unionOverlaps(ranges);

        const content = ranges.map(range => {
            return document.getText(document.validateRange(range));
        }).join('');

        ActionRegister.stash = new Register({
            content: content,
            isLinewise: isLinewise,
        });

        return Promise.resolve(true);
    }

    static yankByTextObject(args: {textObject: TextObject}): Thenable<boolean> {
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

        return ActionRegister.yankRanges(ranges);
    }

    static yankSelections(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        return ActionRegister.yankRanges(activeTextEditor.selections);
    }

    static yankLines(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        const document = activeTextEditor.document;

        let ranges = activeTextEditor.selections.map(selection => UtilRange.toLinewise(selection, document));

        ranges = UtilRange.unionOverlaps(ranges);

        const content = ranges.map(range => {
            return document.getText(document.validateRange(range));
        }).join('');

        ActionRegister.stash = new Register({
            content: content,
            isLinewise: true,
        });

        return Promise.resolve(true);
    }

    @StaticReflect.metadata(SymbolMetadata.Action.isChange, true)
    static putAfter(): Thenable<boolean> {
        if (! ActionRegister.stash) {
            return Promise.resolve(false);
        }

        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        const stash = ActionRegister.stash;

        const putPositions = activeTextEditor.selections.map(selection => {
            return stash.isLinewise
                ? new Position(selection.active.line + 1, 0)
                : selection.active.translate(0, +1);
        });

        return ActionSelection.shrinkToActives()
            .then(() => {
                return activeTextEditor.edit((editBuilder) => {
                    putPositions.forEach(position => {
                        editBuilder.insert(position, stash.content);
                    });
                });
            })
            .then(() => {
                if (stash.isLinewise) {
                    const lines = stash.content.split('\n').length;
                    return ActionMoveCursor.byMotions({motions: [
                        MotionCharacter.down({n: lines - 1}),
                        MotionLine.firstNonBlank(),
                    ]});
                }
                else {
                    const characters = ActionRegister.stash.content.length;
                    return ActionMoveCursor.byMotions({motions: [
                        MotionCharacter.right({n: characters}),
                    ]});
                }
            });
    }

    @StaticReflect.metadata(SymbolMetadata.Action.isChange, true)
    static putBefore(): Thenable<boolean> {
        if (! ActionRegister.stash) {
            return Promise.resolve(false);
        }

        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        const stash = ActionRegister.stash;

        const putPositions = activeTextEditor.selections.map(selection => {
            return stash.isLinewise
                ? selection.active.with(undefined, 0)
                : selection.active;
        });

        return ActionSelection.shrinkToActives()
            .then(() => {
                return activeTextEditor.edit((editBuilder) => {
                    putPositions.forEach(position => {
                        editBuilder.insert(position, stash.content);
                    });
                });
            })
            .then(() => {
                if (stash.isLinewise) {
                    return ActionMoveCursor.byMotions({motions: [
                        MotionCharacter.up(),
                        MotionLine.firstNonBlank(),
                    ]});
                }
                else {
                    return ActionMoveCursor.byMotions({motions: [
                        MotionCharacter.left(),
                    ]});
                }
            });
    }

};
