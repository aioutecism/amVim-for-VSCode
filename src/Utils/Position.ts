import {TextEditor, Position} from 'vscode';

export class UtilPosition {

    /**
     * Get visual column from position.
     */
    static getColumn(textEditor: TextEditor, position: Position): number {
        const text = textEditor.document.lineAt(position.line).text;
        const tabSize = textEditor.options.tabSize as number;

        let column = 0;

        for (let character = 0; character < position.character; character++) {
            column += text.charAt(character) === '\t' ? tabSize : 1;
        }

        return column;
    }

}
