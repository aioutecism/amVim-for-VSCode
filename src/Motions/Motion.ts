import {window, Position} from 'vscode';

export abstract class Motion {

    readonly isLinewise: boolean;
    readonly isCharacterUpdated: boolean;

    private lineDelta = 0;
    private characterDelta = 0;

    constructor(args: {
        isLinewise?: boolean,
        isCharacterUpdated?: boolean,
    } = {}) {
        this.isLinewise = args.isLinewise === undefined ? false : args.isLinewise;
        this.isCharacterUpdated = args.isCharacterUpdated === undefined ? true : args.isCharacterUpdated;
    }

    protected translate(lineDelta: number, characterDelta: number): void {
        this.lineDelta += lineDelta;
        this.characterDelta += characterDelta;
    }

    apply(from: Position, option?: any): Position {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return from;
        }

        const document = activeTextEditor.document;

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

        if (toCharacter === Infinity) {
            toCharacter = document.lineAt(toLine).text.length;
        }

        const preferedColumn = !this.isCharacterUpdated && option
            ? option.preferedColumn as number : null;

        if (preferedColumn) {
            const tabSize = activeTextEditor.options.tabSize as number;
            const toLineText = document.lineAt(toLine).text;

            let lastColumn = -1;
            let thisColumn = 0;
            let i: number;

            for (i = 0; i < toLineText.length && thisColumn <= preferedColumn; i++) {
                lastColumn = thisColumn;
                thisColumn += toLineText.charAt(i) === '\t' ? tabSize : 1;
            }

            // Choose the closest
            const thisColumnDiff = Math.abs(preferedColumn - thisColumn);
            const lastColumnDiff = Math.abs(preferedColumn - lastColumn);
            toCharacter = thisColumnDiff < lastColumnDiff ? i : i - 1;
        }

        toCharacter = Math.max(toCharacter, 0);

        return activeTextEditor.document.validatePosition(new Position(toLine, toCharacter));
    }

}
