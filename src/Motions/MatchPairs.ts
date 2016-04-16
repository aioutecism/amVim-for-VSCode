import {window, Position} from 'vscode';
import {Motion} from './Motion';
import {UtilMatch} from '../Utils/Match';

/** Indicates motion direction, left : opening, right : closing */
export enum MotionPairsDirection {
    Opening,
    Closing
}

/** Indicates what to do with the last matching character */
export enum LastCharacterMatching {
    Include,
    Exclude
}

/** Indicates what to do if the first char is matching (should we ignore it and continue the search continue or not) */
export enum FirstPosPairMatching {
    Notice,
    Ignore
}

/** Motion which goes from a position to the first closing char forward  ( )>"']} ) 
 *  or which goes from a position to the first opening char backwards ( (<"'[{ ) 
 *  Depending on a direction parameter
*/
export class MotionMatchPairs extends Motion {

    private character: string;   
    private includeLast : boolean;   
    private ignoreFirstPosPair : boolean;
    private direction : MotionPairsDirection;     
                  
    /** Go to the first closing char (exclusive) corresponding to 'args.character'  */
    static matchClosing(args: {character: string}, lastChar : LastCharacterMatching = LastCharacterMatching.Exclude, firstPosPair : FirstPosPairMatching = FirstPosPairMatching.Ignore): MotionMatchPairs {        
        const obj = new MotionMatchPairs();
        obj.character = args.character;        
        obj.includeLast = lastChar == LastCharacterMatching.Include; 
        obj.ignoreFirstPosPair = firstPosPair == FirstPosPairMatching.Ignore;
        obj.direction = MotionPairsDirection.Closing;
        return obj;
    }
    
    /** Go to the first opening char (exclusive) corresponding to 'args.character'  */
    static matchOpening(args: {character: string}, lastChar : LastCharacterMatching = LastCharacterMatching.Exclude, firstPosPair : FirstPosPairMatching = FirstPosPairMatching.Ignore): MotionMatchPairs {        
        const obj = new MotionMatchPairs();
        obj.character = args.character;        
        obj.includeLast = lastChar == LastCharacterMatching.Include; 
        obj.ignoreFirstPosPair = firstPosPair == FirstPosPairMatching.Ignore;
        obj.direction = MotionPairsDirection.Opening;
        return obj;
    }
    
    /** Find the matching char, ignoring matching/unmatching char pairs in between 
     *  ignoreFirstMatching = true means the first char doesn't count in matching counts 
     */
    private static indexOfMatching(subLine : string, openingChar : string, closingChar : string, ignoreFirstPosPair : boolean) : number {     
        let matchingCount = 0;     
        let i : number = 0;
        let foundOneAtFirstPos = false;       
        
        if (ignoreFirstPosPair && subLine[0] == openingChar) {
            //avoid classic loop (avoid to count the first opening char)
            i++;     
            foundOneAtFirstPos = true;         
        }
        
        for (i; i < subLine.length; i++) {
            let c = subLine[i];
            if (c == closingChar) {
                if (matchingCount == 0) {
                    return i;
                }
                else {
                    matchingCount--;
                }
            } 
            else if (c == openingChar) {
                matchingCount++;
            }
            if (matchingCount < 0) {
                return -1;
            }
        }
        if (openingChar == closingChar) {
            //corner case for same opening closing char
            //if the cursor is on the first opening char, we have to consider it as the matching one and returning 0
            return foundOneAtFirstPos ? 0 : -1;
        }
        else {
            return -1; 
        }               
    }
    
    apply(from: Position): Position {
        from = super.apply(from);
        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
            return from;
        }
        
        let toLine = from.line;
        let toCharacter : number = from.character;
        const document = activeTextEditor.document;
        const targetText:string = document.lineAt(toLine).text;
        
        if (toCharacter >= targetText.length) {
            //cursor is out of the line
            return from;
        }
        
        const cursorChar = targetText[toCharacter];        
        const openingChar = UtilMatch.mapToOpeningChar[this.character];
        const closingChar = UtilMatch.mapToClosingChar[this.character];
        let subLine : string;
        let offset : number;
        let validMove = true;
        
        switch (this.direction) {
            case MotionPairsDirection.Closing:
                subLine = targetText.substr(toCharacter);         
                offset = MotionMatchPairs.indexOfMatching(subLine, openingChar, closingChar, this.ignoreFirstPosPair);

                if (offset > -1) {
                    toCharacter += offset;
                    
                    if (!this.includeLast) {
                        toCharacter--;
                    }
                } 
                else {
                    validMove = false;
                }
               break;
            case MotionPairsDirection.Opening:
                subLine = targetText.substr(0, toCharacter + 1);        
                const reversedSubLine = subLine.split('').reverse().join('');    
                offset = MotionMatchPairs.indexOfMatching(reversedSubLine, closingChar, openingChar, this.ignoreFirstPosPair);
                            
                if (offset > -1 ) {
                    
                    toCharacter -= offset;
                    
                    if (!this.includeLast) {
                        toCharacter++;
                    }
                }
                else {
                    validMove = false;
                }
                break;
        }               

        //TODO, if validMove == false, use the new movecancelation API to cancel the move
        return new Position(toLine, toCharacter);
    }
    
}
