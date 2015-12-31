import {window, Position, Selection} from 'vscode';
import {ActionReveal} from './Reveal';
import {Motion} from '../Motions/Motion';
import {MotionCharacter} from '../Motions/Character';

export class ActionMoveCursor {

    static byMotions(args: {motions: Motion[], isVisualMode?: boolean}): Thenable<boolean> {
        args.isVisualMode = args.isVisualMode === undefined ? false : args.isVisualMode;

        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        // TODO: Preserve character position

        activeTextEditor.selections = activeTextEditor.selections.map(selection => {
            let anchor: Position;

            let active = args.motions.reduce((position, motion) => {
                return motion.apply(position);
            }, selection.active);

            if (args.isVisualMode) {
                anchor = selection.anchor;

                if (anchor.isEqual(active)) {
                    if (active.isBefore(selection.active)) {
                        anchor = anchor.translate(0, +1);
                        active = active.translate(0, -1);
                    }
                    else {
                        anchor = anchor.translate(0, -1);
                        active = active.translate(0, +1);
                    }
                }
            }
            else {
                anchor = active;
            }

            return new Selection(anchor, active);
        });

        return ActionReveal.primaryCursor();
    }

}
