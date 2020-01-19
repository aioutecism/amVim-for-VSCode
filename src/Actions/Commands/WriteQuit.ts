import * as vscode from 'vscode';
import { Command } from './Base';

export class WriteQuitCommand extends Command {
    execute(): Thenable<boolean | undefined> {
        if (!vscode.window.activeTextEditor) {
            return Promise.resolve(false);
        }

        return vscode.window.activeTextEditor.document
            .save()
            .then(() =>
                vscode.commands.executeCommand(
                    'workbench.action.closeActiveEditor',
                ),
            );
    }
}
