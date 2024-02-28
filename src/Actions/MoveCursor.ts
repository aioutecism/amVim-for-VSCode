import { window, Position, Selection } from 'vscode';
import { ActionReveal } from './Reveal';
import { Motion } from '../Motions/Motion';
import { UtilPosition } from '../Utils/Position';
import { UtilSelection } from '../Utils/Selection';

export class ActionMoveCursor {
    private static preferredColumnBySelectionIndex: {
        [i: number]: number;
    } = [];
    private static isUpdatePreferredColumnBlocked = false;
    private static preferredColumnBlockTimer: NodeJS.Timeout | undefined;

    private static blockUpdatePreferredColumn(): void {
        if (ActionMoveCursor.preferredColumnBlockTimer) {
            clearTimeout(ActionMoveCursor.preferredColumnBlockTimer);
        }

        ActionMoveCursor.isUpdatePreferredColumnBlocked = true;

        ActionMoveCursor.preferredColumnBlockTimer = setTimeout(function () {
            ActionMoveCursor.isUpdatePreferredColumnBlocked = false;
            ActionMoveCursor.preferredColumnBlockTimer = undefined;
        }, 100);
    }

    static updatePreferredColumn(): void {
        if (ActionMoveCursor.isUpdatePreferredColumnBlocked) {
            return;
        }

        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
            return;
        }

        ActionMoveCursor.preferredColumnBySelectionIndex = activeTextEditor.selections.map(
            (selection) => UtilPosition.getColumn(activeTextEditor, selection.active),
        );
    }

    static async byMotions(args: {
        motions: Motion[];
        isVisualMode?: boolean;
        isVisualLineMode?: boolean;
        noEmptyAtLineEnd?: boolean;
    }): Promise<boolean> {
        args.isVisualMode = args.isVisualMode === undefined ? false : args.isVisualMode;
        args.isVisualLineMode = args.isVisualLineMode === undefined ? false : args.isVisualLineMode;
        args.noEmptyAtLineEnd = args.noEmptyAtLineEnd === undefined ? false : args.noEmptyAtLineEnd;

        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
            return false;
        }

        // Prevent preferred character update if no motion updates character.
        if (args.motions.every((motion) => !motion.isCharacterUpdated)) {
            ActionMoveCursor.blockUpdatePreferredColumn();
        }

        const document = activeTextEditor.document;

        const selections: Selection[] = [];

        for (let i = 0; i < activeTextEditor.selections.length; i++) {
            const selection = activeTextEditor.selections[i];
            let anchor: Position;

            let active = args.isVisualMode
                ? UtilSelection.getActiveInVisualMode(selection)
                : selection.active;

            for (const motion of args.motions) {
                active = await motion.apply(active, {
                    preferredColumn: ActionMoveCursor.preferredColumnBySelectionIndex[i],
                });
            }

            if (args.isVisualMode) {
                anchor = selection.anchor;

                const anchorLineLength = activeTextEditor.document.lineAt(anchor.line).text.length;
                const activeLineLength = activeTextEditor.document.lineAt(active.line).text.length;

                if (active.isAfterOrEqual(anchor) && active.character < activeLineLength) {
                    active = active.translate(0, +1);
                }

                if (active.isEqual(anchor) && anchor.character > 0) {
                    anchor = anchor.translate(0, -1);
                } else if (active.isAfter(anchor) && selection.isReversed && anchor.character > 0) {
                    anchor = anchor.translate(0, -1);
                } else if (
                    active.isBefore(anchor) &&
                    !selection.isReversed &&
                    anchor.character < anchorLineLength
                ) {
                    anchor = anchor.translate(0, +1);
                }
            } else if (args.isVisualLineMode) {
                anchor = selection.anchor;

                if (anchor.isBefore(active)) {
                    anchor = anchor.with(undefined, 0);
                    active = active.with(
                        undefined,
                        activeTextEditor.document.lineAt(active.line).text.length,
                    );
                } else {
                    anchor = anchor.with(
                        undefined,
                        activeTextEditor.document.lineAt(anchor.line).text.length,
                    );
                    active = active.with(undefined, 0);
                }
            } else {
                if (args.noEmptyAtLineEnd) {
                    const lineEndCharacter = document.lineAt(active.line).text.length;
                    if (lineEndCharacter !== 0 && active.character === lineEndCharacter) {
                        active = active.translate(0, -1);
                    }
                }

                anchor = active;
            }

            selections.push(new Selection(anchor, active));
        }

        activeTextEditor.selections = selections;
        await ActionReveal.primaryCursor();

        return true;
    }
}
