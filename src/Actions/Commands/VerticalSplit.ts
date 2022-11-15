import * as vscode from 'vscode';
import { Command } from './Base';

export class VerticalSplitCommand extends Command {
    execute(): Thenable<undefined> {
        return vscode.commands.executeCommand('workbench.action.splitEditor');
    }
}
