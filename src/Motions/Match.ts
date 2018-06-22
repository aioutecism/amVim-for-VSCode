import { window, Position } from 'vscode';
import { Motion } from './Motion';
import { MotionEmpty } from './Empty';

enum MotionMatchDirection {
  NEXT,
  PREV,
}

export class MotionMatch extends Motion {
  private static last?: MotionMatch;

  private character: string;
  private direction: MotionMatchDirection;
  private n: number;
  private isTill: boolean;
  private isRepeat = false;

  static next(args: {
    character: string;
    isTill?: boolean;
    n?: number;
  }): Motion {
    args.isTill = args.isTill === undefined ? false : args.isTill;

    const obj = new MotionMatch();
    obj.character = args.character;
    obj.direction = MotionMatchDirection.NEXT;
    obj.isTill = args.isTill;
    obj.n = args.n === undefined ? 1 : args.n;

    MotionMatch.last = obj;

    return obj;
  }

  static prev(args: {
    character: string;
    isTill?: boolean;
    n?: number;
  }): Motion {
    args.isTill = args.isTill === undefined ? false : args.isTill;

    const obj = new MotionMatch();
    obj.character = args.character;
    obj.direction = MotionMatchDirection.PREV;
    obj.isTill = args.isTill;
    obj.n = args.n === undefined ? 1 : args.n;

    MotionMatch.last = obj;

    return obj;
  }

  static clearLast() {
    MotionMatch.last = undefined;
  }

  static repeatLast(args: { isReverse?: boolean; n?: number }): Motion {
    return MotionMatch.last ? MotionMatch.last.clone(args) : new MotionEmpty();
  }

  clone(args: { isReverse?: boolean; n?: number }): MotionMatch {
    args.isReverse = args.isReverse === undefined ? false : args.isReverse;
    args.n = args.n === undefined ? 1 : args.n;

    const obj = new MotionMatch();
    obj.character = this.character;
    obj.direction = args.isReverse
      ? this.direction === MotionMatchDirection.NEXT
        ? MotionMatchDirection.PREV
        : MotionMatchDirection.NEXT
      : this.direction;
    obj.isTill = this.isTill;
    obj.n = args.n;
    obj.isRepeat = true;

    return obj;
  }

  apply(from: Position, option: { isInclusive?: boolean } = {}): Position {
    option.isInclusive =
      option.isInclusive === undefined ? false : option.isInclusive;

    from = super.apply(from);

    const activeTextEditor = window.activeTextEditor;

    if (!activeTextEditor || this.direction === undefined || !this.character) {
      return from;
    }

    const document = activeTextEditor.document;

    let toLine = from.line;
    let toCharacter = from.character;

    let targetText = document.lineAt(toLine).text;

    let shouldSkip = false;
    if (this.isRepeat && this.isTill && this.n === 1) {
      if (this.direction === MotionMatchDirection.NEXT) {
        shouldSkip = targetText[toCharacter + 1] === this.character;
      } else if (this.direction === MotionMatchDirection.PREV) {
        shouldSkip = targetText[toCharacter - 1] === this.character;
      }
    }

    if (this.direction === MotionMatchDirection.NEXT) {
      targetText = targetText.substr(toCharacter + 1 + (shouldSkip ? 1 : 0));

      let offset = -1;

      for (let i = 0; i < this.n; i++) {
        offset = targetText.indexOf(this.character, offset + 1);
        if (!~offset) {
          break;
        }
      }

      if (!!~offset) {
        toCharacter += offset + 1 + (shouldSkip ? 1 : 0);

        if (option.isInclusive) {
          toCharacter += 1;
        }

        if (this.isTill) {
          toCharacter -= 1;
        }
      }
    } else if (this.direction === MotionMatchDirection.PREV) {
      targetText = targetText
        .substr(0, toCharacter - (shouldSkip ? 1 : 0))
        .split('')
        .reverse()
        .join('');

      let offset = -1;

      for (let i = 0; i < this.n; i++) {
        offset = targetText.indexOf(this.character, offset + 1);
        if (!~offset) {
          break;
        }
      }

      if (!!~offset) {
        toCharacter -= offset + 1 + (shouldSkip ? 1 : 0);

        if (this.isTill) {
          toCharacter += 1;
        }
      }
    }

    return new Position(toLine, toCharacter);
  }
}
