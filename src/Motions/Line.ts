import {window, Position} from 'vscode';
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

    apply(from: Position): Position {
        from = super.apply(from);

        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor || ! this.shouldToFirstNonBlank) {
            return from;
        }

        const document = activeTextEditor.document;

        const line = document.lineAt(from.line);

        return from.with(undefined, line.firstNonWhitespaceCharacterIndex);
    }

}
