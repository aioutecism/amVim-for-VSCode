import {TextDocument, Position, Range} from 'vscode';
import {TextObject} from './TextObject';
import {UtilWord, WordCharacterKind} from '../Utils/Word';

export class TextObjectWord extends TextObject {

    private useBlankSeparatedStyle: boolean;

    static byWord(args: {
        useBlankSeparatedStyle: boolean,
        isInclusive: boolean,
    }) {
        const obj = new TextObjectWord();
        obj.isInclusive = args.isInclusive;
        obj.useBlankSeparatedStyle = args.useBlankSeparatedStyle;

        return obj;
    }

    findStartRange(document: TextDocument, anchor: Position): Range {
        const lineIndex = anchor.line;
        const lineText = document.lineAt(lineIndex).text;

        const anchorCharacterKind = UtilWord.getCharacterKind(
            lineText.charCodeAt(anchor.character),
            this.useBlankSeparatedStyle
        );

        let exclusiveCharacterIndex: number = 0;
        for (let characterIndex = anchor.character - 1; characterIndex >= 0; characterIndex--) {
            const characterKind = UtilWord.getCharacterKind(
                lineText.charCodeAt(characterIndex),
                this.useBlankSeparatedStyle
            );

            if (characterKind !== anchorCharacterKind) {
                exclusiveCharacterIndex = characterIndex + 1;
                break;
            }
        }

        let inclusiveCharacterIndex: number = 0;
        for (let characterIndex = exclusiveCharacterIndex - 1; characterIndex >= 0; characterIndex--) {
            const characterKind = UtilWord.getCharacterKind(
                lineText.charCodeAt(characterIndex),
                this.useBlankSeparatedStyle
            );

            if (characterKind !== WordCharacterKind.Blank) {
                inclusiveCharacterIndex = characterIndex + 1;
                break;
            }
        }

        return new Range(
            lineIndex, inclusiveCharacterIndex,
            lineIndex, exclusiveCharacterIndex
        );
    }

    findEndRange(document: TextDocument, anchor: Position): Range {
        const lineIndex = anchor.line;
        const lineText = document.lineAt(lineIndex).text;

        const anchorCharacterKind = UtilWord.getCharacterKind(
            lineText.charCodeAt(anchor.character),
            this.useBlankSeparatedStyle
        );

        let exclusiveCharacterIndex: number = lineText.length - 1;
        for (let characterIndex = anchor.character + 1; characterIndex < lineText.length; characterIndex++) {
            const characterKind = UtilWord.getCharacterKind(
                lineText.charCodeAt(characterIndex),
                this.useBlankSeparatedStyle
            );

            if (characterKind !== anchorCharacterKind) {
                exclusiveCharacterIndex = characterIndex - 1;
                break;
            }
        }

        let inclusiveCharacterIndex: number = lineText.length - 1;
        if (exclusiveCharacterIndex < lineText.length - 1) {
            const includeCharacterKind = anchorCharacterKind === WordCharacterKind.Blank
                ? UtilWord.getCharacterKind(
                    lineText.charCodeAt(exclusiveCharacterIndex + 1),
                    this.useBlankSeparatedStyle
                )
                : WordCharacterKind.Blank;

            for (let characterIndex = exclusiveCharacterIndex + 1; characterIndex < lineText.length; characterIndex++) {
                const characterKind = UtilWord.getCharacterKind(
                    lineText.charCodeAt(characterIndex),
                    this.useBlankSeparatedStyle
                );

                if (characterKind !== includeCharacterKind) {
                    inclusiveCharacterIndex = characterIndex - 1;
                    break;
                }
            }
        }

        return new Range(
            lineIndex, exclusiveCharacterIndex + 1,
            lineIndex, inclusiveCharacterIndex + 1
        );
    }

    protected createRangeDueToIsInclusive(startRange: Range, endRange: Range): Range {
        if (this.isInclusive) {
            // From Vim documentation:
            // "Any trailing white space is included, unless there is none, then leading white space is included."
            if (! endRange.isEmpty) {
                return new Range(startRange.end, endRange.end);
            }
            else {
                return new Range(startRange.start, endRange.start);
            }
        }
        else {
            return new Range(startRange.end, endRange.start);
        }
    }

}
