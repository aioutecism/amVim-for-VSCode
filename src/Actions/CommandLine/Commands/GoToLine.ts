import * as vscode from 'vscode';
import { CommandBase } from './Base';
import { ActionMoveCursor } from '../../MoveCursor';
import { MotionDocument } from '../../../Motions/Document';
import { MotionLine } from '../../../Motions/Line';

class GoToLineCommand extends CommandBase {
  constructor() {
    super();
  }
  async execute(line: string): Promise<void> {
    const lineNumber = Number(line);
    let editor = vscode.window.activeTextEditor;
    if (editor) {
      await ActionMoveCursor.byMotions({
        motions: [
          MotionDocument.toLine({ n: lineNumber }),
          MotionLine.firstNonBlank()
        ],
        noEmptyAtLineEnd: true
      });
    }
  }
}

export default new GoToLineCommand();
