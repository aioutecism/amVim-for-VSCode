import {commands} from 'vscode';

export class ActionIndent {

    static increase(): Thenable<boolean> {
        return commands.executeCommand('editor.action.indentLines');
    }

    static decrease(): Thenable<boolean> {
        return commands.executeCommand('editor.action.outdentLines');
    }

};
