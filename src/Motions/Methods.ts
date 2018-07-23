import { window, Position, commands, SymbolInformation, SymbolKind, Location, TextDocument } from 'vscode';
import { Motion } from './Motion';

enum Direction { Prev, Next }

export class MotionMethod extends Motion {

    private direction: Direction;
    private n: number;

    constructor(args: { direction: Direction, n?: number }) {
        args.n = args.n === undefined ? 1 : args.n;

        super();

        this.direction = args.direction;
        this.n = args.n;
    }

    static prev(args: { n?: number }): Motion {
        return new MotionMethod({
            direction: Direction.Prev,
            n: args.n,
        });
    }

    static next(args: { n?: number }): Motion {
        return new MotionMethod({
            direction: Direction.Next,
            n: args.n,
        });
    }


    private async getMethodSymbols(document: TextDocument): Promise<SymbolInformation[]> {
        let prom = commands.executeCommand('vscode.executeDocumentSymbolProvider', document.uri).then(obj => {
            if (obj === undefined) {
                console.log("Method signatures not available");
                //TODO: show user a message (status bar?) instead
                return new SymbolInformation[0];
            }
            let list = obj as SymbolInformation[]
            return list.filter(sym => sym.kind === SymbolKind.Method || sym.kind === SymbolKind.Function)
        });
        return await prom;
    }

    private async AsApply(from: Position): Promise<Position | undefined> {
        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor || this.direction === undefined || this.n === undefined) {
            return from;
        }

        const document = activeTextEditor.document;
        // get all symbol tokens available under C-S-O or in the Outline sidebar
        return this.getMethodSymbols(document).then(list => {
            list.unshift(new SymbolInformation("Begin", SymbolKind.Method, "", new Location(document.uri, new Position(0, 0))))
            list.push(new SymbolInformation("End", SymbolKind.Method, "", new Location(document.uri, new Position(document.lineCount, 100))))
            let currentIndex = 0;
            let onSignature = false;
            for (; currentIndex < list.length - 1; currentIndex++) {
                if (list[currentIndex].location.range.start.line <= from.line
                    && list[currentIndex + 1].location.range.start.line > from.line) {   // within the i-th method

                    if (list[currentIndex].location.range.end.line >= from.line)
                        onSignature = true; // right on the signature
                    break;
                }
            }
            console.log("Identified position: " + currentIndex + "/" + (list.length - 2));


            if (currentIndex == 0 && this.direction === Direction.Prev)
                return undefined; // no previous method available
            if (currentIndex >= list.length - 1 && this.direction === Direction.Next)
                return undefined; // no next method available

            if (this.direction === Direction.Prev && !onSignature) {
                currentIndex += 1;  // go back to the defining line first
                console.log("Shifted index when moving backwards: " + currentIndex);

            }

            let targetIndex;
            if (this.direction === Direction.Next)
                targetIndex = currentIndex + this.n;
            else
                targetIndex = currentIndex - this.n;

            targetIndex = Math.min(targetIndex, list.length - 2);   // ignore sentinel End element
            targetIndex = Math.max(targetIndex, 1);

            console.log("Would move to: " + targetIndex + "/" + (list.length - 2));
            return list[targetIndex].location.range.start;

            //TODO: handle going to start/end of a method
        });
    }

    apply(from: Position): Position {
        from = super.apply(from);
        // grr, how to make sure the promises execute until here?
        // from =
        this.AsApply(from);

        return from;
    }
}

// Test ground:
// class main{
//     public void name() {
        
//     }    

//     private void name2() {
        
//     }
//     private bool b1;
    
//     public void name3() {
        
//     }
//     public void name4(int A,
//                     int B) {
        // this will not work multiline for now :(
//     }
// }
