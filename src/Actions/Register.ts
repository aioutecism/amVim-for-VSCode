import {window, Position, Range, Selection} from 'vscode';
import {ActionReveal} from './Reveal';
import {ActionMoveCursor} from './MoveCursor';
import {ActionSelection} from './Selection';
import {Motion} from '../Motions/Motion';
import {MotionCharacter} from '../Motions/Character';
import {MotionLine} from '../Motions/Line';
import {UtilRange} from '../Utils/Range';

enum PutDirection {Before, After};

export class ActionRegister {

    private static stash: string = '';

    static yankByMotions(args: {motions: Motion[]}): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        let ranges = activeTextEditor.selections.map(selection => {
            const start = selection.active;
            const end = args.motions.reduce((position, motion) => {
                return motion.apply(position, {isInclusive: true});
            }, start);
            return new Range(start, end);
        });

        ranges = ranges.map(range => {
            return range.isSingleLine ? range : UtilRange.toLinewise(range);
        })

        ranges = UtilRange.unionOverlaps(ranges);

        ActionRegister.stash = ranges.map(range => {
            return activeTextEditor.document.getText(range);
        }).join('');

        return Promise.resolve(true);
    }

    static yankSelections(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        ActionRegister.stash = activeTextEditor.selections.map(range => {
            return activeTextEditor.document.getText(range);
        }).join('');

        return Promise.resolve(true);
    }

    static yankLine(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        let ranges = activeTextEditor.selections.map(selection => {
            return new Range(
                selection.active.line, 0,
                selection.active.line + 1, 0
            );
        });

        ranges = UtilRange.unionOverlaps(ranges);

        ActionRegister.stash = ranges.map(range => {
            return activeTextEditor.document.getText(range);
        }).join('');

        return Promise.resolve(true);
    }

    static putAfter(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        const characters = ActionRegister.stash.length;
        const lines = ActionRegister.stash.split(/\n/).length;

        const putPositions = activeTextEditor.selections.map(selection => {
            return lines === 1
                ? selection.active.translate(0, +1)
                : new Position(selection.active.line + 1, 0);
        });

        return ActionSelection.shrinkToActives()
            .then(() => {
                return activeTextEditor.edit((editBuilder) => {
                    putPositions.forEach(position => {
                        editBuilder.insert(position, ActionRegister.stash);
                    });
                });
            })
            .then(() => {
                if (lines === 1) {
                    return ActionMoveCursor.byMotions({motions: [
                        MotionCharacter.right({n: characters}),
                    ]});
                }
                else {
                    return ActionMoveCursor.byMotions({motions: [
                        MotionCharacter.down({n: lines - 1}),
                        MotionLine.firstNonBlank(),
                    ]});
                }
            });
    }

    static putBefore(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        const characters = ActionRegister.stash.length;
        const lines = ActionRegister.stash.split(/\n/).length;

        const putPositions = activeTextEditor.selections.map(selection => {
            return lines === 1
                ? selection.active
                : selection.active.with(undefined, 0);
        });

        return ActionSelection.shrinkToActives()
            .then(() => {
                return activeTextEditor.edit((editBuilder) => {
                    putPositions.forEach(position => {
                        editBuilder.insert(position, ActionRegister.stash);
                    });
                });
            })
            .then(() => {
                if (lines === 1) {
                    return ActionMoveCursor.byMotions({motions: [
                        MotionCharacter.left(),
                    ]});
                }
                else {
                    return ActionMoveCursor.byMotions({motions: [
                        MotionCharacter.up(),
                        MotionLine.firstNonBlank(),
                    ]});
                }
            });
    }

};
