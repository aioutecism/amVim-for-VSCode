import {Selection} from 'vscode';

export class UtilSelection {

    static unionOverlaps(from: Selection[]): Selection[] {
        const to: Selection[] = [];

        while (from.length !== 0) {
            let a = from.shift();
            for (let i = 0; i < from.length; i++) {
                const b = from[i];
                if (a.intersection(b) !== undefined) {
                    const unionedRange = a.union(b);
                    a = a.isReversed
                        ? new Selection(unionedRange.end, unionedRange.start)
                        : new Selection(unionedRange.start, unionedRange.end);
                    from.splice(i, 1);
                    i--;
                }
            }
            to.push(a);
        }

        return to;
    }

}
