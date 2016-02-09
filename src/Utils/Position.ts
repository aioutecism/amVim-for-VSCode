import {TextDocument, Position} from 'vscode';

export class UtilPosition {

    static fitIntoDocument(document: TextDocument, from: Position): Position {
        const lineCount = document.lineCount;

        let line = from.line;
        let character = from.character;

        if (line < 0) {
            line = 0;
            character = 0;
        }
        else if (line >= document.lineCount) {
            line = document.lineCount - 1;
            character = document.lineAt(document.lineCount - 1).text.length;
        }

        return new Position(line, character);
    }

}