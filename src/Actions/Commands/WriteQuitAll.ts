import * as vscode from 'vscode';
import { Command } from './Base';

export class WriteQuitAllCommand extends Command {
    async execute(): Promise<boolean | undefined> {
        return (await vscode.workspace.saveAll(true))
            ? vscode.commands.executeCommand('workbench.action.closeAllEditors')
            : false;
    }
}
