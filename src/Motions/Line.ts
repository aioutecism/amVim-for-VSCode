import {window, Selection} from 'vscode';
import {Motion} from './Motion';

export class MotionLine extends Motion {

    private shouldToFirstNonBlank = false;

    static firstNonBlank(): Motion {
        const obj = new MotionLine();
        obj.shouldToFirstNonBlank = true;
        return obj;
    }

    static start(): Motion {
        const obj = new MotionLine();
        obj.translate(0, -Infinity);
        return obj;
    }

    static end(): Motion {
        const obj = new MotionLine();
        obj.translate(0, +Infinity);
        return obj;
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
