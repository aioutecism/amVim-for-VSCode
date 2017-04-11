import {window, Position} from 'vscode';
import {Motion} from './Motion';

enum MotionMatchDirection {NEXT, PREV}

export class MotionMatch extends Motion {

    private character: string;
    private direction: MotionMatchDirection;
    private isTill: boolean;

    static next(args: {character: string, isTill?: boolean}): Motion {
        args.isTill = args.isTill === undefined ? false : args.isTill;

        const obj = new MotionMatch();
        obj.character = args.character;
        obj.direction = MotionMatchDirection.NEXT;
        obj.isTill = args.isTill;

        return obj;
    }

    static prev(args: {character: string, isTill?: boolean}): Motion {
        args.isTill = args.isTill === undefined ? false : args.isTill;

        const obj = new MotionMatch();
        obj.character = args.character;
        obj.direction = MotionMatchDirection.PREV;
        obj.isTill = args.isTill;

        return obj;
    }

    apply(from: Position, option: {isInclusive?: boolean} = {}): Position {
        option.isInclusive = option.isInclusive === undefined ? false : option.isInclusive;

        from = super.apply(from);

        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor || this.direction === undefined || ! this.character) {
            return from;
        }

        const document = activeTextEditor.document;

        let toLine = from.line;
        let toCharacter = from.character;

        let targetText = document.lineAt(toLine).text;

        if (this.direction === MotionMatchDirection.NEXT) {
            targetText = targetText.substr(toCharacter + 1);

            const offset = targetText.indexOf(this.character);

            if (!!~offset) {
                toCharacter += offset + 1;

                if (option.isInclusive) {
                    toCharacter += 1;
                }

                if (this.isTill) {
                    toCharacter -= 1;
                }
            }
        }

        else if (this.direction === MotionMatchDirection.PREV) {
            targetText = targetText
                .substr(0, toCharacter)
                .split('').reverse().join('');

            const offset = targetText.indexOf(this.character);

            if (!!~offset) {
                toCharacter -= offset + 1;

                if (this.isTill) {
                    toCharacter += 1;
                }
            }
        }

        return new Position(toLine, toCharacter);
    }

}
