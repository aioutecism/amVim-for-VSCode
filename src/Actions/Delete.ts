import {commands} from 'vscode';

export class ActionDelete {

    static line(): Thenable<boolean> {
        return commands.executeCommand('editor.action.deleteLines');
    }

};
