import {TextDocument, Position, Range} from 'vscode';
import {TextObject} from './TextObject';

export class TextObjectQuotedString extends TextObject {

    private static escapeCharacter = '\\';

    private quoteCharacter: string;
    private adjustedAnchor: Position;

    static bySingle(args: {isInclusive: boolean}): TextObject {
        const obj = new TextObjectQuotedString();
        obj.isInclusive = args.isInclusive;
        obj.quoteCharacter = '\'';

        return obj;
    }

    static byDouble(args: {isInclusive: boolean}): TextObject {
        const obj = new TextObjectQuotedString();
        obj.isInclusive = args.isInclusive;
        obj.quoteCharacter = '"';

        return obj;
    }

    static byBackward(args: {isInclusive: boolean}): TextObject {
        const obj = new TextObjectQuotedString();
        obj.isInclusive = args.isInclusive;
        obj.quoteCharacter = '`';

        return obj;
    }

    findStartRange(document: TextDocument, anchor: Position): Range | null {
        const lineIndex = anchor.line;
        const lineText = document.lineAt(lineIndex).text;

        let characterIndex = anchor.character - 1;

        while (characterIndex >= 0) {
            const characterEscaped = lineText[characterIndex - 1] === TextObjectQuotedString.escapeCharacter;
            if (lineText[characterIndex] === this.quoteCharacter && !characterEscaped) {
                this.adjustedAnchor = new Position(lineIndex, anchor.character);
                return new Range(
                    lineIndex, characterIndex,
                    lineIndex, characterIndex + 1
                );
            }

            characterIndex--;
        }

        characterIndex = anchor.character;

        while (characterIndex < lineText.length) {
            const characterEscaped = lineText[characterIndex - 1] === TextObjectQuotedString.escapeCharacter;
            if (lineText[characterIndex] === this.quoteCharacter && !characterEscaped) {
                this.adjustedAnchor = new Position(lineIndex, characterIndex + 1);
                return new Range(
                    lineIndex, characterIndex,
                    lineIndex, characterIndex + 1
                );
            }

            characterIndex++;
        }

        return null;
    }

    findEndRange(document: TextDocument, anchor: Position): Range | null {
        if (this.adjustedAnchor !== undefined) {
            anchor = this.adjustedAnchor;
        }

        const lineIndex = anchor.line;
        const lineText = document.lineAt(lineIndex).text;

        let characterIndex = anchor.character;

        while (characterIndex < lineText.length) {
            const characterEscaped = lineText[characterIndex - 1] === TextObjectQuotedString.escapeCharacter;
            if (lineText[characterIndex] === this.quoteCharacter && !characterEscaped) {
                return new Range(
                    lineIndex, characterIndex,
                    lineIndex, characterIndex + 1
                );
            }

            characterIndex++;
        }

        return null;
    }

}
