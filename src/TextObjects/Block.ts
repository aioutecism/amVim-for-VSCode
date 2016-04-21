import {window, TextDocument, Position, Range} from 'vscode';
import {TextObject, TextObjectSearchingRange} from './TextObject';

export class TextObjectBlock extends TextObject {

    private openingCharacter: string;
    private closingCharacter: string;
    private searchingRange: TextObjectSearchingRange;

    static inclusive(args: {
        openingCharacter: string,
        closingCharacter: string,
        searchingRange: TextObjectSearchingRange
    }): TextObject {

        const obj = new TextObjectBlock();
        obj.isInclusive = true;
        obj.openingCharacter = args.openingCharacter;
        obj.closingCharacter = args.closingCharacter;
        obj.searchingRange = args.searchingRange;

        return obj;
    }

    static exclusive(args: {
        openingCharacter: string,
        closingCharacter: string,
        searchingRange: TextObjectSearchingRange
    }): TextObject {

        const obj = new TextObjectBlock();
        obj.isInclusive = false;
        obj.openingCharacter = args.openingCharacter;
        obj.closingCharacter = args.closingCharacter;
        obj.searchingRange = args.searchingRange;

        return obj;
    }

    protected findStartRange(document:TextDocument, anchor: Position): Range {
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
                        return new Range(
                            lineIndex, characterIndex,
                            lineIndex, characterIndex + 1
                        );
                    }
                    else {
                        matchingCount--;
                    }
                }

                characterIndex--;

            }

            lineIndex--;

        } while (lineIndex >= 0 && this.searchingRange === TextObjectSearchingRange.Document);

        return null;
    }

    protected findEndRange(document:TextDocument, anchor: Position): Range {
        let matchingCount = 0;
        let lineIndex = anchor.line;

        do {

            const lineText = document.lineAt(lineIndex).text;

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
                        return new Range(
                            lineIndex, characterIndex,
                            lineIndex, characterIndex + 1
                        );
                    }
                    else {
                        matchingCount--;
                    }
                }

                characterIndex++;

            }

            lineIndex++;

        } while (lineIndex < document.lineCount && this.searchingRange === TextObjectSearchingRange.Document);

        return null;
    }

}
