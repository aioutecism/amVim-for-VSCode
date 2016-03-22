import {TextDocument, Range} from 'vscode';
import {UtilPosition} from './Position';

export class UtilRange {

    static unionOverlaps(from: Range[]): Range[] {
        const to: Range[] = [];

        while (from.length !== 0) {
            let a = from.shift();
            for (let i = 0; i < from.length; i++) {
                let b = from[i];
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

    static toLinewise(from: Range): Range {
        return new Range(
            from.start.line, 0,
            from.end.line + 1, 0
        );
    }

    static fitIntoDocument(document: TextDocument, from: Range): Range {
        return new Range(
            UtilPosition.fitIntoDocument(document, from.start),
            UtilPosition.fitIntoDocument(document, from.end)
        );
    }

}
