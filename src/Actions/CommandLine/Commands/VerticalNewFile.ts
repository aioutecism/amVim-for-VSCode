import * as vscode from 'vscode';
import { CommandBase } from './Base';
import NewFile from './NewFile';

class VerticalNewFileCommand extends CommandBase {
  constructor() {
    super();
  }
  async execute(): Promise<void> {
    await NewFile.execute();
    await vscode.commands.executeCommand('workbench.action.moveEditorToNextGroup');
  }
}

export default new VerticalNewFileCommand();
