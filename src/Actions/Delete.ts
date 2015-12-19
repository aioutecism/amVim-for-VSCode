import {commands} from 'vscode';
import {ActionReveal} from './Reveal';

export class ActionDelete {

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
