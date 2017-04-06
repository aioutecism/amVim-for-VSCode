import {window, Position} from 'vscode';
import {Motion} from './Motion';
import {TextObjectBlock} from '../TextObjects/Block';
import {TextObject} from '../TextObjects/TextObject';

interface MotionMatchPairMap {
    [key: string]: (args) => TextObject;
}

export class MotionMatchPair extends Motion {

    // TODO: C-style comments (/* */) and C preprocessor conditionals are not supported for now

    private static openingCharacterMap: MotionMatchPairMap = {
        '(': TextObjectBlock.byParentheses,
        '{': TextObjectBlock.byBraces,
        '[': TextObjectBlock.byBrackets,
    };

    private static openingCharacters: string[] = Object.keys(MotionMatchPair.openingCharacterMap);

    private static closingCharacterMap: MotionMatchPairMap = {
        ')': TextObjectBlock.byParentheses,
        '}': TextObjectBlock.byBraces,
        ']': TextObjectBlock.byBrackets,
    };

    private static characterMap: MotionMatchPairMap = Object.assign(
        <MotionMatchPairMap>{}, MotionMatchPair.openingCharacterMap, MotionMatchPair.closingCharacterMap
    );

    private static matchCharacters: string[] = Object.keys(MotionMatchPair.characterMap);

    static matchPair(): Motion {
        return new MotionMatchPair();
    }

    apply(
        from: Position,
        option: {
            isInclusive?: boolean,
        } = {}
    ): Position {
        option.isInclusive = option.isInclusive === undefined ? false : option.isInclusive;

        from = super.apply(from);

        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
            return from;
        }

        const document = activeTextEditor.document;
        const targetText = document.lineAt(from.line).text;

        for (let character = from.character; character < targetText.length; character++) {
            const currentCharacterString = targetText[character];

            if (MotionMatchPair.matchCharacters.indexOf(currentCharacterString) < 0) {
                continue;
            }

            const textObject: TextObject = MotionMatchPair.characterMap[currentCharacterString]({});

            if (MotionMatchPair.openingCharacters.indexOf(currentCharacterString) < 0) {
                const startRange = textObject.findStartRange(document, new Position(from.line, character));
                if (startRange !== null) {
                    return startRange.start;
                }
            }
            else {
                const endRange = textObject.findEndRange(document, new Position(from.line, character));
                if (endRange !== null) {
                    return option.isInclusive ? endRange.end : endRange.start;
                }
            }

            return from;
        }

        return from;
    }
}
