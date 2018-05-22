import * as vscode from 'vscode';
import { CommandBase } from './Base';
import VisualSplit from './VisualSplit';
import NewFile from './NewFile';

class VerticalNewFileCommand extends CommandBase {
  constructor() {
    super();
  }
  async execute(): Promise<void> {
    await VisualSplit.execute();
    await NewFile.execute();
    await vscode.commands.executeCommand('workbench.action.closeOtherEditors');
  }
}

export default new VerticalNewFileCommand();
