import {window, Position, Selection} from 'vscode';
import {ActionReveal} from './Reveal';
import {Motion} from '../Motions/Motion';
import {MotionCharacter} from '../Motions/Character';

export class ActionMoveCursor {

    private static preferedCharacterBySelectionIndex: {[i: number]: number} = [];
    private static isUpdatePreferedCharacterBlocked = false;
    private static preferedCharacterLockTimer: number;

    private static blockUpdatePreferedCharacter(): void {
        if (ActionMoveCursor.preferedCharacterLockTimer) {
            clearTimeout(ActionMoveCursor.preferedCharacterLockTimer);
        }

        ActionMoveCursor.isUpdatePreferedCharacterBlocked = true;

        ActionMoveCursor.preferedCharacterLockTimer = setTimeout(function() {
            ActionMoveCursor.isUpdatePreferedCharacterBlocked = false;
            ActionMoveCursor.preferedCharacterLockTimer = null;
        }, 100);
    }

    static updatePreferedCharacter(): Thenable<boolean> {
        if (ActionMoveCursor.isUpdatePreferedCharacterBlocked) {
            return Promise.resolve(false);
        }

        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        ActionMoveCursor.preferedCharacterBySelectionIndex = activeTextEditor.selections.map((selection, i) => {
            return selection.active.character;
        });

        return Promise.resolve(true);
    }

    static byMotions(args: {
        motions: Motion[],
        isVisualMode?: boolean,
        isVisualLineMode?: boolean,
        noEmptyAtLineEnd?: boolean
    }): Thenable<boolean> {
        args.isVisualMode = args.isVisualMode === undefined ? false : args.isVisualMode;
        args.isVisualLineMode = args.isVisualLineMode === undefined ? false : args.isVisualLineMode;
        args.noEmptyAtLineEnd = args.noEmptyAtLineEnd === undefined ? false : args.noEmptyAtLineEnd;

        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        // Prevent prefered character update if no motion updates character.
        if (args.motions.every(motion => ! motion.isCharacterUpdated)) {
            ActionMoveCursor.blockUpdatePreferedCharacter();
        }

        const document = activeTextEditor.document;

        // HACK: Work arounds revealRange's horizontal scroll bug
        const primaryCursorCharacter = activeTextEditor.selection.active.character;

        activeTextEditor.selections = activeTextEditor.selections.map((selection, i) => {
            let anchor: Position;

            let active = args.motions.reduce((position, motion) => {
                return motion.apply(position, {
                    isInclusive: args.isVisualMode,
                    preferedCharacter: ActionMoveCursor.preferedCharacterBySelectionIndex[i]
                });
            }, selection.active);

            if (args.isVisualMode) {
                anchor = selection.anchor;

                if (anchor.isEqual(active)) {
                    if (active.isBefore(selection.active)) {
                        anchor = anchor.translate(0, +1);
                        if (active.character > 0) {
                            active = active.translate(0, -1);
                        }
                    }
                    else {
                        if (anchor.character > 0) {
                            anchor = anchor.translate(0, -1);
                        }
                        active = active.translate(0, +1);
                    }
                }
            }
            else if (args.isVisualLineMode) {
                anchor = selection.anchor;

                if (anchor.isBefore(active)) {
                    anchor = anchor.with(undefined, 0);
                    active = active.with(undefined, activeTextEditor.document.lineAt(active.line).text.length);
                }
                else {
                    anchor = anchor.with(undefined, activeTextEditor.document.lineAt(anchor.line).text.length);
                    active = active.with(undefined, 0);
                }
            }
            else {
                if (args.noEmptyAtLineEnd) {
                    const lineEndCharacter = document.lineAt(active.line).text.length;
                    if (lineEndCharacter !== 0 && active.character === lineEndCharacter) {
                        active = active.translate(0, -1);
                    }
                }

                anchor = active;
            }

            return new Selection(anchor, active);
        });

        // HACK: Work arounds revealRange's horizontal scroll bug
        const shouldCenterIfOutsideViewport = activeTextEditor.selection.active.character !== primaryCursorCharacter;

        return ActionReveal.primaryCursor({shouldCenterIfOutsideViewport: shouldCenterIfOutsideViewport});
    }

}
