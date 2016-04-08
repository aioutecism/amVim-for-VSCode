import {window, Position} from 'vscode';
import {Motion} from './Motion';

export class MotionDocument extends Motion {

    private line: number;

    static toLine(args: {n: number}): Motion {
        const obj = new MotionDocument();
        obj.line = args.n - 1;
        return obj;
    }

    apply(from: Position, option: {preferedCharacter?: number} = {}): Position {
        if (! this.isCharacterUpdated && option.preferedCharacter !== undefined) {
            from = from.with(undefined, option.preferedCharacter);
        }

        from = super.apply(from);

        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor || this.line === undefined) {
            return from;
        }

        const document = activeTextEditor.document;

        let line = this.line;
        line = Math.max(0, this.line);
        line = Math.min(document.lineCount, this.line);

        return from.with(line);
    }

}
