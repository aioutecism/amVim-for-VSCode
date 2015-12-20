import {window, Selection} from 'vscode';
import {Motion} from './Motion';

export class MotionLine extends Motion {

    private shouldToFirstNonBlank = false;

    firstNonBlank(): void {
        this.shouldToFirstNonBlank = true;
    }

    start(): void {
        this.translate(0, -Infinity);
    }

    end(): void {
        this.translate(0, +Infinity);
    }

    apply(from: Selection): Selection {
        from = super.apply(from);

        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor || ! this.shouldToFirstNonBlank) {
            return from;
        }

        const document = activeTextEditor.document;

        const matches = document.lineAt(from.active.line).text.match(/^\s+/);
        const toCharacter = matches ? matches[0].length : 0;

        const position = from.active.with(undefined, toCharacter);

        return new Selection(position, position);
    }

}
