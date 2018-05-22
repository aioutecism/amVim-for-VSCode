import * as vscode from 'vscode';
import { CommandBase } from './Base';

class WriteCommand extends CommandBase {
  constructor() {
    super();
  }
  async execute(): Promise<void> {
    await vscode.commands.executeCommand('workbench.action.files.save');
  }
}

export default new WriteCommand();
