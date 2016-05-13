import {TextDocument, Position, Range} from 'vscode';
import {TextObject} from './TextObject';
import {UtilWord, WordCharacterKind} from '../Utils/Word';

export class TextObjectWord extends TextObject {
    public static byWord(args: {isInclusive: boolean}) {
        let obj = new TextObjectWord();
        obj.isInclusive = args.isInclusive;
        return obj;
    }

    public static byWholeWord(args: {isInclusive: boolean}) {
        let obj = new TextObjectWord(true);
        obj.isInclusive = args.isInclusive;
        return obj;
    }

    constructor(private useBlankSeparatedStyle: boolean = false) {
        super();
    }

    public findStartRange(document: TextDocument, anchor: Position): Range {
        const lineIndex = anchor.line;
        const characterIndex = anchor.character;
        const text = document.lineAt(lineIndex).text;
        const [startIndexInclusive, startIndexNonInclusive] = TextObjectWord.findStartCharacters(text, characterIndex, this.useBlankSeparatedStyle);

        return new Range(lineIndex, startIndexInclusive, lineIndex, startIndexNonInclusive);
    }

    public findEndRange(document: TextDocument, anchor: Position): Range {
        const lineIndex = anchor.line;
        const characterIndex = anchor.character;
        const text = document.lineAt(lineIndex).text;
        const [endIndexInclusive, endIndexNonInclusive] = TextObjectWord.findEndCharacters(text, characterIndex, this.useBlankSeparatedStyle);

        return new Range(lineIndex, endIndexNonInclusive + 1, lineIndex, endIndexInclusive + 1);
    }

    protected createRangeDueToIsInclusive(startRange: Range, endRange: Range) {
        if (!this.isInclusive) {
            return new Range(startRange.end, endRange.start);
        }
        // from vim documentation:
        // "Any trailing white space is included, unless there is none, then leading white space is included."
        if (endRange.end.character !== endRange.start.character) {
            return new Range(startRange.end, endRange.end);
        }
        else {
            return new Range(startRange.start, endRange.start);
        }
    }

    static findStartCharacters(text: string, character: number, useBlankSeparatedStyle: boolean = false): [number, number] {
        const startCharacterKind = UtilWord.getCharacterKind(
            text.charCodeAt(character), useBlankSeparatedStyle
        );
        let inclusiveCharacter = 0;
        let nonInclusiveCharacter = 0;

        // find nonInclusiveCharacter
        while (character > 0) {
            const previousCharacterKind = UtilWord.getCharacterKind(
                text.charCodeAt(character - 1), useBlankSeparatedStyle
            );
            if (previousCharacterKind !== startCharacterKind) {
                nonInclusiveCharacter = character;
                inclusiveCharacter = character;
                break;
            }
            character--;
        }

        // find inclusiveCharacter
        const allowedCharacterKind = startCharacterKind === WordCharacterKind.Blank ? WordCharacterKind.Regular : WordCharacterKind.Blank;
        while (character > 0) {
            const previousCharacterKind = UtilWord.getCharacterKind(
                text.charCodeAt(character - 1), useBlankSeparatedStyle
            );
            if (previousCharacterKind === allowedCharacterKind) {
                inclusiveCharacter = character - 1;
            }
            else {
                break;
            }
            character--;
        }
        return [inclusiveCharacter, nonInclusiveCharacter];
    }

    static findEndCharacters(text: string, character: number, useBlankSeparatedStyle: boolean = false): [number, number] {
        const startCharacterKind = UtilWord.getCharacterKind(
            text.charCodeAt(character), useBlankSeparatedStyle
        );
        let inclusiveCharacter = text.length;
        let nonInclusiveCharacter = text.length;

        // find nonInclusiveCharacter
        while (character < text.length) {
            const nextCharacterKind = UtilWord.getCharacterKind(
                text.charCodeAt(character + 1), useBlankSeparatedStyle
            );
            if (nextCharacterKind !== startCharacterKind) {
                nonInclusiveCharacter = character;
                inclusiveCharacter = character;
                break;
            }
            character++;
        }

        // find inclusiveCharacter
        const allowedCharacterKind = startCharacterKind === WordCharacterKind.Blank ? WordCharacterKind.Regular : WordCharacterKind.Blank;
        while (character < text.length) {
            const nextCharacterKind = UtilWord.getCharacterKind(
                text.charCodeAt(character + 1), useBlankSeparatedStyle
            );
            if (nextCharacterKind === allowedCharacterKind) {
                inclusiveCharacter = character + 1;
            }
            else {
                break;
            }
            character++;
        }

        return [inclusiveCharacter, nonInclusiveCharacter];
    }
}
