import {window, Position} from 'vscode';

export class Motion {

    private lineDelta = 0;
    private characterDelta = 0;

    protected translate(lineDelta: number, characterDelta: number): void {
        this.lineDelta += lineDelta;
        this.characterDelta += characterDelta;
    }

    apply(from: Position, option?): Position {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return from;
        }

        const document = activeTextEditor.document;

        // TODO: Count tab as editor.tabSize

        let toLine = from.line + this.lineDelta;
        let toCharacter = from.character + this.characterDelta;

        if (toLine < 0) {
            toLine = 0;
            toCharacter = 0;
        }
        else if (toLine > document.lineCount - 1) {
            toLine = document.lineCount - 1;
            toCharacter = Infinity;
        }

        toCharacter = Math.min(toCharacter, document.lineAt(toLine).text.length - 1);
        toCharacter = Math.max(toCharacter, 0);

        return new Position(toLine, toCharacter);
    }

}
