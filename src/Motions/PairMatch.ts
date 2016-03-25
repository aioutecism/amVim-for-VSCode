import {window, Position} from 'vscode';
import {Motion} from './Motion';

enum MotionPairMatchDirection {OPENING, CLOSING};

/** Motion which goes from a postion to the first opening char backwards ( (<"'[{ ) or to the first closing char forward ( )>"']} ) */
export class MotionPairMatch extends Motion {

    private character: string;
    private direction: MotionPairMatchDirection;
    private static mapToClosingChar = {"'"  : "'",
                                       "\"" : "\"", 
                                       "<"  : ">",
                                       ">"  : ">",
                                       "("  : ")",
                                       ")"  : ")",
                                       "["  : "]",
                                       "]"  : "]",
                                       "{"  : "}", 
                                       "}"  : "}",
                                      };
                                 
    private static mapToOpeningChar = {"'"  : "'",
                                       "\"" : "\"", 
                                       ">"  : "<",
                                       "<"  : "<",
                                       ")"  : "(",
                                       "("  : "(",
                                       "]"  : "[",
                                       "["  : "[",
                                       "}"  : "{",
                                       "{"  : "{"
                                      };
   
    /** Go to the first opening char (exclusive) corresponding to 'args.character'  */
    static matchOpening(args: {character: string}): MotionPairMatch {        
        const obj = new MotionPairMatch();
        obj.character = args.character;
        obj.direction = MotionPairMatchDirection.OPENING;
        return obj;
    }
    
    /** Go to the first closing char (exclusive) corresponding to 'args.character'  */
    static matchEnding(args: {character: string}): MotionPairMatch {        
        const obj = new MotionPairMatch();
        obj.character = args.character;
        obj.direction = MotionPairMatchDirection.CLOSING;    
        return obj;
    }

    apply(from: Position, option: {isInclusive?: boolean} = {}): Position {
        from = super.apply(from);
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor || this.direction === undefined || ! this.character) {
            return from;
        }

        const document = activeTextEditor.document;
        let toLine = from.line;
        let toCharacter = from.character;
        let targetText:string = document.lineAt(toLine).text;

        if (this.direction === MotionPairMatchDirection.OPENING) {
             targetText = targetText
                .substr(0, toCharacter)
                .split('').reverse().join('');

            var openingChar = MotionPairMatch.mapToOpeningChar[this.character];
            const offset = targetText.indexOf(openingChar);

            if (!!~offset) {
                toCharacter -= offset;
            }
        }

        else if (this.direction === MotionPairMatchDirection.CLOSING) {
            targetText = targetText.substr(toCharacter + 1);
            var closingChar = MotionPairMatch.mapToClosingChar[this.character];
            const offset = targetText.indexOf(closingChar);

            if (!!~offset) {
                toCharacter += offset + 1;
            }
        }

        return new Position(toLine, toCharacter);
    }

}
