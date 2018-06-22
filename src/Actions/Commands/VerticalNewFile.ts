import * as vscode from 'vscode';
import { Command } from './Base';

export class VerticalNewFileCommand extends Command {
  execute(): Thenable<undefined> {
    return vscode.commands
      .executeCommand('workbench.action.files.newUntitledFile')
      .then(() =>
        vscode.commands.executeCommand('workbench.action.moveEditorToNextGroup')
      );
  }
}
