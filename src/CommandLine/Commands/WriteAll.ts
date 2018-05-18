import * as vscode from 'vscode';
import { CommandBase } from './Base';

class WallCommand extends CommandBase{
  constructor() {
    super()
    this.name = 'wall'
  }
  async execute(): Promise<void> {
    await vscode.workspace.saveAll(false);
  }
}

export default new WallCommand()