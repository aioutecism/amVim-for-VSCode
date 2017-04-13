import {window, Position} from 'vscode';
import {Motion} from './Motion';

enum Direction {Prev, Next}

export class MotionDirection extends Motion {

    private direction: Direction;
    private n: number;

    constructor(args: {direction: Direction, n?: number}) {
        args.n = args.n === undefined ? 1 : args.n;

        super();

        this.direction = args.direction;
        this.n = args.n;
    }

    static prev(args: {n?: number} = {}): Motion {
        return new MotionDirection({
            direction: Direction.Prev,
            n: args.n,
        });
    }

    static next(args: {n?: number} = {}): Motion {
        return new MotionDirection({
            direction: Direction.Next,
            n: args.n,
        });
    }

    apply(from: Position, option?: any): Position {
        from = super.apply(from);

        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor || this.direction === undefined || this.n === undefined) {
            return from;
        }

        const document = activeTextEditor.document;

        const _lengthByLine: {[line: number]: number} = [];
        const getLengthOfLine = (line: number): number => {
            if (_lengthByLine[line] === undefined) {
                _lengthByLine[line] = document.lineAt(line).text.length;
            }
            return _lengthByLine[line];
        };

        const offset = this.direction === Direction.Prev ? -1 : +1;
        let toLine = from.line;
        let toCharacter = from.character;

        for (let i = 0; i < this.n; i++) {
            toCharacter += offset;

            if (toCharacter < 0) {
                toLine--;

                if (toLine < 0) {
                    toLine = 0;
                    toCharacter = 0;
                    break;
                }

                toCharacter = Math.max(getLengthOfLine(toLine) - 1, 0);
            }
            else if (toCharacter >= getLengthOfLine(toLine)) {
                toLine++;

                if (toLine >= document.lineCount) {
                    toLine = Math.max(document.lineCount - 1, 0);
                    toCharacter = Math.max(getLengthOfLine(toLine) - 1, 0);
                    break;
                }

                toCharacter = 0;
            }
        }

        return new Position(toLine, toCharacter);
    }

}
