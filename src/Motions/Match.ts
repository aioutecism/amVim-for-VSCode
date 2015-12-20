import {window, Selection, Position} from 'vscode';
import {Motion} from './Motion';

enum MotionMatchDirection {NEXT, PREV};

export class MotionMatch extends Motion {

    private character: string;
    private direction: MotionMatchDirection;

    next(character: string): void {
        this.character = character;
        this.direction = MotionMatchDirection.NEXT;
    }

    prev(character: string): void {
        this.character = character;
        this.direction = MotionMatchDirection.PREV;
    }

    apply(from: Selection): Selection {
        from = super.apply(from);

        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor || this.direction === undefined || ! this.character) {
            return from;
        }

        const document = activeTextEditor.document;

        let toLine = from.active.line;
        let toCharacter = from.active.character;

        let targetText = document.lineAt(toLine).text;

        if (this.direction === MotionMatchDirection.NEXT) {
            targetText = targetText.substr(toCharacter + 1);

            const offset = targetText.indexOf(this.character);
            toCharacter += !!~offset ? offset + 1 : 0;
        }

        else if (this.direction === MotionMatchDirection.PREV) {
            targetText = targetText
                .substr(0, toCharacter)
                .split('').reverse().join('');

            const offset = targetText.indexOf(this.character);
            toCharacter -= !!~offset ? offset + 1 : 0;
        }

        const activePosition = new Position(toLine, toCharacter);
        const anchorPosition = from.isEmpty ? activePosition : from.anchor;

        return new Selection(anchorPosition, activePosition);
    }

}
