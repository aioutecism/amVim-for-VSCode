import {commands} from 'vscode';

export class ActionCommand {

    static goToLine(): Thenable<boolean | undefined> {
        return commands.executeCommand('workbench.action.gotoLine');
    }

}
