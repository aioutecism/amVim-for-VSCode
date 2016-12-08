import {Range} from 'vscode';

export class RangeOffset {

    readonly lineOffset: number;
    readonly characterOffset: number;

    constructor(lineOffset: number, characterOffset: number);
    constructor(fromRange: Range);
    constructor(first: Range | number, second?: number) {
        if (first instanceof Range) {
            this.lineOffset = first.end.line - first.start.line;
            this.characterOffset = first.end.character - first.start.character;
        }
        else {
            this.lineOffset = first;
            this.characterOffset = second!;
        }
    }

}
