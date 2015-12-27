import {window, Selection} from 'vscode';
import {ActionReveal} from './Reveal';
import {Motion} from '../Motions/Motion';
import {MotionCharacter} from '../Motions/Character';

export class ActionMoveCursor {

    static byMotions(args: {motions: Motion[]}): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        // TODO: Preserve character position

        activeTextEditor.selections = activeTextEditor.selections.map(selection => {
            const active = args.motions.reduce((position, motion) => {
                return motion.apply(position);
            }, selection.active);

            const anchor = selection.isEmpty ? active : selection.anchor;

            return new Selection(anchor, active);
        });

        return ActionReveal.primaryCursor();
    }

    static characterRight(args?: {n: number}): Thenable<boolean> {
        return ActionMoveCursor.byMotions({motions: [MotionCharacter.right(args)]});
    }

}
