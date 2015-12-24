import {window} from 'vscode';
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
            args.motions.forEach((motion) => {
                selection = motion.apply(selection);
            });
            return selection;
        });

        return ActionReveal.primaryCursor();
    }

    static characterRight(args?: {n: number}): Thenable<boolean> {
        return ActionMoveCursor.byMotions({motions: [MotionCharacter.right(args)]});
    }

}
