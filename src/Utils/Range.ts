import { TextDocument, Range } from 'vscode';

export class UtilRange {
    static unionOverlaps(from: readonly Range[]): Range[] {
        // Make a copy so we won't destroy the array passed in.
        const fromcopy = [...from];

        const to: Range[] = [];

        while (fromcopy.length > 0) {
            let a = fromcopy.shift()!;

            for (let i = 0; i < fromcopy.length; i++) {
                const b = fromcopy[i];
                if (a.intersection(b) !== undefined) {
                    a = a.union(b);
                    fromcopy.splice(i, 1);
                    i--;
                }
            }

            to.push(a);
        }

        return to;
    }

    static toLinewise(from: Range, document: TextDocument): Range {
        let startLine: number;
        let startCharacter: number;

        if (from.start.line !== 0 && from.end.line === document.lineCount - 1) {
            startLine = from.start.line - 1;
            startCharacter = Infinity;
        } else {
            startLine = from.start.line;
            startCharacter = 0;
        }

        return document.validateRange(new Range(startLine, startCharacter, from.end.line + 1, 0));
    }

    static isSingleCharacter(range: Range): boolean {
        return (
            range.start.line === range.end.line && range.end.character - range.start.character === 1
        );
    }
}
