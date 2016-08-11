import {commands} from 'vscode';

export class ActionHistory {

    static undo(): Thenable<boolean> {
        return commands.executeCommand('undo');
    }

    static redo(): Thenable<boolean> {
        return commands.executeCommand('redo');
    }

};
