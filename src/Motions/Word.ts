import {window, Selection, Position} from 'vscode';
import {Motion} from './Motion';

export enum MotionWordPosition {NEXT_START, NEXT_END, PREV_START};

export class MotionWord extends Motion {

    private wordDelta: MotionWordPosition;
    private wordSeparators = './\\\\()"\'\\-:,.;<>~!@#$%^&*|+=\\[\\]{}`~?';

    nextStart(): void {
        this.wordDelta = MotionWordPosition.NEXT_START;
    }

    nextEnd(): void {
        this.wordDelta = MotionWordPosition.NEXT_END;
    }

    prevStart(): void {
        this.wordDelta = MotionWordPosition.PREV_START;
    }

    apply(from: Selection): Selection {
        from = super.apply(from);

        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor || this.wordDelta === undefined) {
            return from;
        }

        const document = activeTextEditor.document;

        let toLine = from.active.line;
        let toCharacter = from.active.character;

        let targetText = document.lineAt(toLine).text;

        if (this.wordDelta === MotionWordPosition.NEXT_START) {
            targetText = targetText.substr(toCharacter);

            const matches = targetText.match(new RegExp(
                `^(\\s+)?((?:[${this.wordSeparators}]+|[^\\s${this.wordSeparators}]+)\\s*)?`
            ));
            toCharacter += matches[1] ? matches[1].length : matches[2] ? matches[2].length : matches[0].length;
        }

        else if (this.wordDelta === MotionWordPosition.NEXT_END) {
            targetText = targetText.substr(toCharacter);

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

        const activePosition = new Position(toLine, toCharacter);
        const anchorPosition = from.isEmpty ? activePosition : from.anchor;

        return new Selection(anchorPosition, activePosition);
    }

}
