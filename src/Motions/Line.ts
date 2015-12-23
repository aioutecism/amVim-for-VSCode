import {window, Selection} from 'vscode';
import {Motion} from './Motion';

export class MotionLine extends Motion {

    private shouldToFirstNonBlank = false;

    firstNonBlank(): Motion {
        this.shouldToFirstNonBlank = true;
        return this;
    }

    start(): Motion {
        this.translate(0, -Infinity);
        return this;
    }

    end(): Motion {
        this.translate(0, +Infinity);
        return this;
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
