import * as vscode from 'vscode';
import { Command } from './Base';

export class WriteQuitAllCommand extends Command {

    execute(): Thenable<undefined> {
        return vscode.workspace.saveAll(true)
            .then(() => vscode.commands.executeCommand('workbench.action.closeAllEditors'));
    }

}
