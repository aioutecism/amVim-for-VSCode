import * as vscode from 'vscode';
import { Command } from './Base';

export class WriteQuitCommand extends Command {
    async execute(): Promise<boolean | undefined> {
        if (!vscode.window.activeTextEditor) {
            return false;
        }

        return (await vscode.window.activeTextEditor.document.save())
            ? vscode.commands.executeCommand('workbench.action.closeActiveEditor')
            : false;
    }
}
