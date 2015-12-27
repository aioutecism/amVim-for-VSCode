import {window, Position} from 'vscode';
import {Motion} from './Motion';

enum MotionWordPosition {NEXT_START, NEXT_END, PREV_START};

export class MotionWord extends Motion {

    private wordDelta: MotionWordPosition;
    private wordSeparators = './\\\\()"\'\\-:,.;<>~!@#$%^&*|+=\\[\\]{}`~?';

    static nextStart(): Motion {
        const obj = new MotionWord();
        obj.wordDelta = MotionWordPosition.NEXT_START;
        return obj;
    }

    static nextEnd(): Motion {
        const obj = new MotionWord();
        obj.wordDelta = MotionWordPosition.NEXT_END;
        return obj;
    }

    static prevStart(): Motion {
        const obj = new MotionWord();
        obj.wordDelta = MotionWordPosition.PREV_START;
        return obj;
    }

    apply(from: Position): Position {
        from = super.apply(from);

        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor || this.wordDelta === undefined) {
            return from;
        }

        const document = activeTextEditor.document;

        let toLine = from.line;
        let toCharacter = from.character;

        // TODO: Move to next line if needed

        let targetText = document.lineAt(toLine).text;

        if (this.wordDelta === MotionWordPosition.NEXT_START) {
            targetText = targetText.substr(toCharacter);

            const matches = targetText.match(new RegExp(
                `^(\\s+)?((?:[${this.wordSeparators}]+|[^\\s${this.wordSeparators}]+)\\s*)?`
            ));
            toCharacter += matches[1] ? matches[1].length : matches[2] ? matches[2].length : matches[0].length;
        }

        else if (this.wordDelta === MotionWordPosition.NEXT_END) {
            targetText = targetText.substr(toCharacter + 1);

            const matches = targetText.match(new RegExp(
                `^(\\s+)?((?:[${this.wordSeparators}]+|[^\\s${this.wordSeparators}]+))?`
            ));
            toCharacter += matches[0].length;
        }

        else if (this.wordDelta === MotionWordPosition.PREV_START) {
            targetText = targetText
                .substr(0, toCharacter)
                .split('').reverse().join('');

            const matches = targetText.match(new RegExp(
                `^(\\s+)?((?:[${this.wordSeparators}]+|[^\\s${this.wordSeparators}]+))?`
            ));
            toCharacter -= matches[0].length;
        }

        return new Position(toLine, toCharacter);
    }

}
