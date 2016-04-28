import {window, Position, Range} from 'vscode';
import {Motion} from './Motion';
import {TextObjectBlock} from '../TextObjects/Block';

enum MotionMatchDirection {NEXT, PREV};

export class MotionMatchPair extends Motion {
    private static openingCharacterMap = {
        '(': TextObjectBlock.byParentheses,
        '{': TextObjectBlock.byBraces,
        '[': TextObjectBlock.byBrackets,
    }
    
    private static closingCharacterMap = {
        ')': TextObjectBlock.byParentheses,
        '}': TextObjectBlock.byBraces,
        ']': TextObjectBlock.byBrackets,
    }
    
    private static characterMap = Object.assign(
        {}, MotionMatchPair.openingCharacterMap, MotionMatchPair.closingCharacterMap
    );

    static matchPair(): Motion {
        const obj = new MotionMatchPair();
        return obj;
    }

    apply(from: Position, option?: any): Position {
        from = super.apply(from);

        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
            return from;
        }

        const document = activeTextEditor.document;
        
        const characterUnderCursor = document.getText(new Range(from, new Position(from.line, from.character+1)));
        if(Object.keys(MotionMatchPair.characterMap).indexOf(characterUnderCursor) < 0) {
            return from;
        }
        
        const textObject = MotionMatchPair.characterMap[characterUnderCursor]({isInclusive: true});
        const startRange = textObject.findStartRange(document, from);
        const endRange = textObject.findEndRange(document, from);
        
        if(Object.keys(MotionMatchPair.openingCharacterMap).indexOf(characterUnderCursor) >= 0) {
            return endRange.start;
        } else {
            return startRange.start;
        }
    }
}
