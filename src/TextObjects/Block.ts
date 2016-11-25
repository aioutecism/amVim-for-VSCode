import {TextDocument, Position, Range} from 'vscode';
import {TextObject} from './TextObject';

export class TextObjectBlock extends TextObject {

    private openingCharacter: string;
    private closingCharacter: string;

    static byParentheses(args: {isInclusive: boolean}): TextObject {
        const obj = new TextObjectBlock();
        obj.isInclusive = args.isInclusive;
        obj.openingCharacter = '(';
        obj.closingCharacter = ')';

        return obj;
    }

    static byBrackets(args: {isInclusive: boolean}): TextObject {
        const obj = new TextObjectBlock();
        obj.isInclusive = args.isInclusive;
        obj.openingCharacter = '[';
        obj.closingCharacter = ']';

        return obj;
    }

    static byBraces(args: {isInclusive: boolean}): TextObject {
        const obj = new TextObjectBlock();
        obj.isInclusive = args.isInclusive;
        obj.openingCharacter = '{';
        obj.closingCharacter = '}';

        return obj;
    }

    static byChevrons(args: {isInclusive: boolean}): TextObject {
        const obj = new TextObjectBlock();
        obj.isInclusive = args.isInclusive;
        obj.openingCharacter = '<';
        obj.closingCharacter = '>';

        return obj;
    }

    findStartRange(document: TextDocument, anchor: Position): Range | null {
        let matchingCount = 0;
        let lineIndex = anchor.line;

        do {

            const lineText = document.lineAt(lineIndex).text;

            let characterIndex = lineIndex === anchor.line ? anchor.character : lineText.length - 1;

            while (characterIndex >= 0) {

                if (lineText[characterIndex] === this.closingCharacter) {
                    // Don't count closing character on anchor.
                    if (! anchor.isEqual(new Position(lineIndex, characterIndex))) {
                        matchingCount++;
                    }
                }
                else if (lineText[characterIndex] === this.openingCharacter) {
                    if (matchingCount === 0) {
                        const isAtEndOfLine =
                            characterIndex === lineText.length - 1
                            && lineIndex < document.lineCount - 1;
                        this._isLinewise = (this._isLinewise !== false) && isAtEndOfLine;

                        // Including line break if character is at the end of line.
                        if (isAtEndOfLine) {
                            return new Range(
                                lineIndex, characterIndex,
                                lineIndex + 1, 0
                            );
                        }
                        else {
                            return new Range(
                                lineIndex, characterIndex,
                                lineIndex, characterIndex + 1
                            );
                        }
                    }
                    else {
                        matchingCount--;
                    }
                }

                characterIndex--;

            }

            lineIndex--;

        } while (lineIndex >= 0);

        return null;
    }

    findEndRange(document: TextDocument, anchor: Position): Range | null {
        let matchingCount = 0;
        let lineIndex = anchor.line;

        do {

            const line = document.lineAt(lineIndex);
            const lineText = line.text;

            let characterIndex = lineIndex === anchor.line ? anchor.character : 0;

            while (characterIndex < lineText.length) {

                if (lineText[characterIndex] === this.openingCharacter) {
                    // Don't count opening character on anchor.
                    if (! anchor.isEqual(new Position(lineIndex, characterIndex))) {
                        matchingCount++;
                    }
                }
                else if (lineText[characterIndex] === this.closingCharacter) {
                    if (matchingCount === 0) {
                        const isAtStartOfLine =
                            characterIndex === line.firstNonWhitespaceCharacterIndex
                            && lineIndex > 0;
                        this._isLinewise = (this._isLinewise !== false) && isAtStartOfLine;

                        // Including line break if character is at the begining of line(excluding whitespaces).
                        if (isAtStartOfLine) {
                            return new Range(
                                lineIndex - 1, document.lineAt(lineIndex - 1).text.length,
                                lineIndex, characterIndex + 1
                            );
                        }
                        else {
                            return new Range(
                                lineIndex, characterIndex,
                                lineIndex, characterIndex + 1
                            );
                        }
                    }
                    else {
                        matchingCount--;
                    }
                }

                characterIndex++;

            }

            lineIndex++;

        } while (lineIndex < document.lineCount);

        return null;
    }

}
