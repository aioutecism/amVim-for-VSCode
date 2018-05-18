import * as vscode from 'vscode';
import { CommandBase } from './Base';

class GoToLineCommand extends CommandBase{
  constructor() {
    super()
    this.name = 'gotoline'
  }
  async execute(line: string): Promise<void> {
    let lineNumber = Number(line)
    let editor = vscode.window.activeTextEditor;
    if (editor) {
      let range = editor.document.lineAt(lineNumber-1).range;
      editor.selection =  new vscode.Selection(range.start, range.start);
      editor.revealRange(range);
    }
  }
}

export default new GoToLineCommand()
