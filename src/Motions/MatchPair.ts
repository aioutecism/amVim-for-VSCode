import {window, Position, Range} from 'vscode';
import {Motion} from './Motion';
import {MotionMatch} from '../Motions/Match';
import {TextObjectBlock} from '../TextObjects/Block';

enum MotionMatchDirection {NEXT, PREV};

export class MotionMatchPair extends Motion {
    
    // TODO: C-style comments (/* */) and C preprocessor conditionals are not supported for now
    
    private static openingCharacterMap = {
        '(': TextObjectBlock.byParentheses,
        '{': TextObjectBlock.byBraces,
        '[': TextObjectBlock.byBrackets,
    }
    private static openingCharacters = Object.keys(MotionMatchPair.openingCharacterMap);
    
    private static closingCharacterMap = {
        ')': TextObjectBlock.byParentheses,
        '}': TextObjectBlock.byBraces,
        ']': TextObjectBlock.byBrackets,
    }
    
    private static characterMap = Object.assign(
        {}, MotionMatchPair.openingCharacterMap, MotionMatchPair.closingCharacterMap
    );
    private static matchCharacters = Object.keys(MotionMatchPair.characterMap);

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
        const targetText = document.lineAt(from.line).text;
        
        for(let i = from.character; i < targetText.length; i += 1) {
            const currentCharacter = targetText[i];
            
            if(MotionMatchPair.matchCharacters.indexOf(currentCharacter) < 0) {
                continue;
            }
            
            const textObject = MotionMatchPair.characterMap[currentCharacter]({isInclusive: true});
            
            if(MotionMatchPair.openingCharacters.indexOf(currentCharacter) < 0) {
                const startRange = textObject.findStartRange(document, new Position(from.line, i));
                if(startRange !== null) {
                    return startRange.start;
                }
            } else {
                const endRange = textObject.findEndRange(document, new Position(from.line, i));
                if(endRange !== null) {
                    return endRange.start;
                }
            }
            
            return from;
        }
    }
}
