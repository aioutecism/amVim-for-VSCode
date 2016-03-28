import {window, Position} from 'vscode';
import {Motion} from './Motion';
import {UtilMatch} from '../Utils/Match';

/** Motion which goes from a postion to the first opening char backwards ( (<"'[{ )  */
export class MotionMatchOpening extends Motion {

    private character: string;   
    private includeLast : boolean;   
    private ignoreFirstClosing : boolean;   
                  
    /** Go to the first opening char (exclusive) corresponding to 'args.character'  */
    static matchOpening(args: {character: string}, includeLast : boolean = false, ignoreFirstClosing : boolean = true): MotionMatchOpening {        
        const obj = new MotionMatchOpening();
        obj.character = args.character;        
        obj.includeLast = includeLast; 
        obj.ignoreFirstClosing = ignoreFirstClosing;
        return obj;
    }
    
    /** Find the matching char, ignoring matching/unmatching char pairs in between 
     *  ignoreFirstClosing = true means the first char doesn't count in closing counts 
     */
    private static indexOfMatching(subLine : string, openingChar : string, closingChar : string, ignoreFirstClosing : boolean) : number {     
        let closingCount = 0;     
        let i : number = 0;
        if (ignoreFirstClosing && subLine[0] == closingChar) {
            //avoid classic loop (avoid to count the first closing char)
            i++;            
        }
        
        for (i; i < subLine.length; i++) {
            let c = subLine[i];
            if (c == openingChar) {
                if (closingCount == 0) {
                    return i;
                }
                else {
                    closingCount--;
                }
            } 
            else if (c == closingChar) {
                closingCount++;
            }
            if (closingCount < 0) {
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
        const subLine = targetText.substr(0, toCharacter + 1);        
        const reversedSubLine = subLine.split('').reverse().join('');    
        
        const offset = MotionMatchOpening.indexOfMatching(reversedSubLine, openingChar, closingChar, this.ignoreFirstClosing);
                      
        if (offset > -1 ) {
            
            toCharacter -= offset;
            
            if (!this.includeLast) {
                toCharacter++;
            }
        }
            

        return new Position(toLine, toCharacter);
    }

}
