import * as vscode from 'vscode';
import { Command } from './Base';

export class WriteQuitCommand extends Command {

    execute(): Thenable<undefined> {
        return vscode.commands.executeCommand('workbench.action.files.save')
            .then(() => vscode.commands.executeCommand('workbench.action.closeActiveEditor'));
    }

}
