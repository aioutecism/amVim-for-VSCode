import {window, Position} from 'vscode';
import {Motion} from './Motion';

export class MotionDocument extends Motion {

    private line: number;
    private percent: number|undefined;

    static toLine(args: {n: number}): Motion {
        const obj = new MotionDocument({isLinewise: true});
        obj.line = args.n - 1;

        return obj;
    }

    static toLineOrFirst(args: {n?: number}): Motion {
        return MotionDocument.toLine({n: args.n === undefined ? 1 : args.n});
    }

    static toLineOrLast(args: {n?: number}): Motion {
        return MotionDocument.toLine({n: args.n === undefined ? +Infinity : args.n});
    }

    static toLinePercent(args: {n: number}): Motion {
        const obj = new MotionDocument();
        obj.percent = args.n/100;
        obj.line = 0;
        return obj;
    }

    apply(from: Position): Position {
        from = super.apply(from);

        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor || this.line === undefined) {
            return from;
        }

        const document = activeTextEditor.document;

        let line = (this.percent === undefined)
            ? this.line
            : Math.round((document.lineCount-1) * this.percent);
        
        line = Math.max(0, line);
        line = Math.min(document.lineCount - 1, line);
        let lineText = document.lineAt(line);
        return from.with(line, lineText.firstNonWhitespaceCharacterIndex);
    }

}
