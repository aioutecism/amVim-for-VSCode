import * as vscode from 'vscode';
import { Command } from './Base';

export class WriteCommand extends Command {
    execute(): Thenable<undefined> {
        return vscode.commands.executeCommand('workbench.action.files.save');
    }
}
