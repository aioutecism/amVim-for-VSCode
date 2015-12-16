import {commands} from 'vscode';
import {ActionReveal} from './Reveal';

export class ActionDelete {

    static line(): Thenable<boolean> {
        return commands.executeCommand('editor.action.deleteLines')
            .then(ActionReveal.primaryCursor);
    }

};
