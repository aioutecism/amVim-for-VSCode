import * as vscode from 'vscode';
import { CommandBase } from './Base';

class WriteAllCommand extends CommandBase {
  constructor() {
    super();
  }
  async execute(): Promise<void> {
    await vscode.workspace.saveAll(true);
  }
}

export default new WriteAllCommand();
