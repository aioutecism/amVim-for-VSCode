import {window, commands} from 'vscode';
import {ActionReveal} from './Reveal';
import {Motion} from '../Motions/Motion';

export class ActionDelete {

    static byMotions(args: {motions: Motion[]}): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        activeTextEditor.selections = activeTextEditor.selections.map(selection => {
            args.motions.forEach((motion) => {
                selection = motion.apply(selection);
            });
            return selection;
        });

        activeTextEditor.edit((editBuilder) => {
            // editBuilder.delete();
        })

        return ActionReveal.primaryCursor();
    }

    static selectionsOrLeft(): Thenable<boolean> {
        return commands.executeCommand('deleteLeft');
    }

    static selectionsOrRight(): Thenable<boolean> {
        return commands.executeCommand('deleteRight');
    }

    static line(): Thenable<boolean> {
        return commands.executeCommand('editor.action.deleteLines')
            .then(ActionReveal.primaryCursor);
    }

};
