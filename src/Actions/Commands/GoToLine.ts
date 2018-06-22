import { Command } from './Base';
import { ActionMoveCursor } from '../MoveCursor';
import { MotionDocument } from '../../Motions/Document';
import { MotionLine } from '../../Motions/Line';

export class GoToLineCommand extends Command {
  private readonly line: number;

  constructor(input: string) {
    super(input);

    this.line = Number(this.input);
  }

  execute(): Thenable<boolean> {
    if (!Number.isInteger(this.line)) {
      return Promise.resolve(false);
    }

    return ActionMoveCursor.byMotions({
      motions: [
        MotionDocument.toLine({ n: this.line }),
        MotionLine.firstNonBlank(),
      ],
      noEmptyAtLineEnd: true,
    });
  }
}
