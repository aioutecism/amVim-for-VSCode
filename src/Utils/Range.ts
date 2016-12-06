import {TextDocument, Range} from 'vscode';

export class UtilRange {

    static unionOverlaps(from: Range[]): Range[] {
        // Make a copy so we won't destory the array passed in.
        from = from.map(range => range);

        const to: Range[] = [];

        while (from.length > 0) {
            let a = from.shift()!;

            for (let i = 0; i < from.length; i++) {
                const b = from[i];
                if (a.intersection(b) !== undefined) {
                    a = a.union(b);
                    from.splice(i, 1);
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
        }
        else {
            startLine = from.start.line;
            startCharacter = 0;
        }

        return document.validateRange(new Range(
            startLine, startCharacter,
            from.end.line + 1, 0
        ));
    }

}
