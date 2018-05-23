import * as vscode from 'vscode';
import { CommandBase } from './Base';

class NewFileCommand extends CommandBase {
  constructor() {
    super();
  }
  async execute(): Promise<void> {
    await vscode.commands.executeCommand('workbench.action.files.newUntitledFile');
  }
}

export default new NewFileCommand();
