import { window, Position } from 'vscode';
import { Motion } from './Motion';

export class MotionDocument extends Motion {
    private line?: number;
    private percent?: number;

    static toLine(args: { n: number }): Motion {
        const obj = new MotionDocument({ isLinewise: true });
        obj.line = args.n - 1;

        return obj;
    }

    static toLineOrFirst(args: { n?: number }): Motion {
        return MotionDocument.toLine({ n: args.n === undefined ? 1 : args.n });
    }

    static toLineOrLast(args: { n?: number }): Motion {
        return MotionDocument.toLine({
            n: args.n === undefined ? +Infinity : args.n,
        });
    }

    static toLinePercent(args: { n: number }): Motion {
        const obj = new MotionDocument({ isLinewise: true });
        obj.percent = Math.min(args.n / 100, 1);
        return obj;
    }

    async apply(from: Position): Promise<Position> {
        from = await super.apply(from);

        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
            return from;
        }

        const document = activeTextEditor.document;

        let line =
            this.line !== undefined
                ? this.line
                : this.percent !== undefined
                  ? Math.round((document.lineCount - 1) * this.percent)
                  : undefined;

        if (line === undefined) {
            return from;
        }

        line = Math.max(0, line);
        line = Math.min(document.lineCount - 1, line);

        const lineText = document.lineAt(line);

        return from.with(line, lineText.firstNonWhitespaceCharacterIndex);
    }
}
