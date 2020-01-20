import {commands} from 'vscode';

export class ActionNavigation {

    static goToDeclaration(): Thenable<undefined> {
        return commands.executeCommand('editor.action.goToDeclaration');
    }

    static goToTypeDefinition(): Thenable<undefined> {
        return commands.executeCommand('editor.action.goToTypeDefinition');
    }

}
