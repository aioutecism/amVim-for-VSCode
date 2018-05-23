import * as vscode from 'vscode';
import { CommandBase } from './Base';

class QuitAllCommand extends CommandBase {
  constructor() {
    super();
  }
  async execute(): Promise<void> {
    await vscode.commands.executeCommand('workbench.action.closeAllEditors');
  }
}

export default new QuitAllCommand();
