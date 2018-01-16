import {commands} from 'vscode';

export class ActionFold {

    static fold(): Thenable<boolean | undefined> {
        return commands.executeCommand('editor.fold');
    }

    static unfold(): Thenable<boolean | undefined> {
        return commands.executeCommand('editor.unfold');
    }

    static foldAll(): Thenable<boolean | undefined> {
        return commands.executeCommand('editor.foldAll');
    }

    static unfoldAll(): Thenable<boolean | undefined> {
        return commands.executeCommand('editor.unfoldAll');
    }

}
