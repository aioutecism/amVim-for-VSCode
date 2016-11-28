import {TextDocument, Position, Range} from 'vscode';
import {TextObject} from './TextObject';

export class TextObjectBlock extends TextObject {

    protected shouldExpandToLinewise: boolean = true;

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

        } while (lineIndex < document.lineCount);

        return null;
    }

}
