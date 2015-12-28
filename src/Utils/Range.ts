import {Range} from 'vscode';

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

}