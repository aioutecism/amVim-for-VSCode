import {window, Position} from 'vscode';
import {Motion} from './Motion';
import {UtilMatch} from '../Utils/Match';

/** Motion which goes from a postion to the first closing char forward  ( )>"']} ) */
export class MotionMatchClosing extends Motion {

    private character: string;   
    private includeLast : boolean;   
    private ignoreFirstOpening : boolean;   
                  
    /** Go to the first opening char (exclusive) corresponding to 'args.character'  */
    static matchClosing(args: {character: string}, includeLast : boolean = false, ignoreFirstOpening : boolean = true): MotionMatchClosing {        
        const obj = new MotionMatchClosing();
        obj.character = args.character;        
        obj.includeLast = includeLast; 
        obj.ignoreFirstOpening = ignoreFirstOpening;
        return obj;
    }
    
    /** Find the matching char, ignoring matching/unmatching char pairs in between 
     *  ignoreFirstOpening = true means the first char doesn't count in closing counts 
     */
    private static indexOfMatching(subLine : string, openingChar : string, closingChar : string, ignoreFirstOpening : boolean) : number {     
        let openingCount = 0;     
        let i : number = 0;
        if (ignoreFirstOpening && subLine[0] == openingChar) {
            //avoid classic loop (avoid to count the first opening char)
            i++;            
        }
        
        for (i; i < subLine.length; i++) {
            let c = subLine[i];
            if (c == closingChar) {
                if (openingCount == 0) {
                    return i;
                }
                else {
                    openingCount--;
                }
            } 
            else if (c == openingChar) {
                openingCount++;
            }
            if (openingCount < 0) {
                return -1;
            }
        }
        return -1;        
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
        const subLine = targetText.substr(toCharacter); 
        
        const offset = MotionMatchClosing.indexOfMatching(subLine, openingChar, closingChar, this.ignoreFirstOpening);
        
        if (offset > -1) {
            toCharacter += offset;
            
            if (!this.includeLast) {
                toCharacter--;
            }
        }            

        return new Position(toLine, toCharacter);
    }

}
