import * as vscode from 'vscode';
import { Command } from './Base';

export class ShellCommand extends Command {
    execute(): Thenable<undefined> {
        return vscode.commands.executeCommand('workbench.action.terminal.toggleTerminal');
    }
}
