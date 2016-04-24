import {TextDocument, Position} from 'vscode';

export class UtilPosition {

    // The official TextDocument.validatePosition is buggy (https://github.com/Microsoft/vscode/issues/5704).
    static fitIntoDocument(document: TextDocument, from: Position): Position {
        const lineCount = document.lineCount;

        let {line, character} = from;

        const maxLine = document.lineCount - 1;

        if (line < 0) {
            line = 0;
            character = 0;
        }
        else if (line > maxLine) {
            line = maxLine;
            character = Infinity;
        }

        const maxCharacter = document.lineAt(line).text.length;

        if (character < 0) {
            character = 0;
        }
        else if (character > maxCharacter) {
            character = maxCharacter;
        }

        return new Position(line, character);
    }

}
