import {window, TextDocument, Position, Range} from 'vscode';
import {TextObject} from './TextObject';

export class TextObjectQuotedString extends TextObject {

    private quoteCharacter: string;
    private adjustedAnchor: Position;

    static inclusive(args: {quoteCharacter: string}): TextObject {
        const obj = new TextObjectQuotedString();
        obj.isInclusive = true;
        obj.quoteCharacter = args.quoteCharacter;

        return obj;
    }

    static exclusive(args: {quoteCharacter: string}): TextObject {
        const obj = new TextObjectQuotedString();
        obj.isInclusive = false;
        obj.quoteCharacter = args.quoteCharacter;

        return obj;
    }

    protected findStartRange(document:TextDocument, anchor: Position): Range {
        const lineIndex = anchor.line;
        const lineText = document.lineAt(lineIndex).text;

        let characterIndex = anchor.character - 1;

        while (characterIndex >= 0) {
            if (lineText[characterIndex] === this.quoteCharacter) {
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
            if (lineText[characterIndex] === this.quoteCharacter) {
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

    protected findEndRange(document:TextDocument, anchor: Position): Range {
        if (this.adjustedAnchor !== undefined) {
            anchor = this.adjustedAnchor;
        }

        const lineIndex = anchor.line;
        const lineText = document.lineAt(lineIndex).text;

        let characterIndex = anchor.character;

        while (characterIndex < lineText.length) {
            if (lineText[characterIndex] === this.quoteCharacter) {
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
