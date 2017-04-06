import {Selection, Position} from 'vscode';

export class UtilSelection {

    static unionOverlaps(from: Selection[]): Selection[] {
        // Make a copy so we won't destory the array passed in.
        from = from.map(selection => selection);

        const to: Selection[] = [];

        while (from.length > 0) {
            let a = from.shift()!;

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

    static shrinkToActive(selection: Selection): Selection {
        const line = selection.active.line;
        let character = selection.active.character;

        if (! selection.isEmpty && ! selection.isReversed && character > 0) {
            character--;
        }

        return new Selection(
            line, character,
            line, character
        );
    }

    static shrinkToActives(selections: Selection[]): Selection[] {
        return selections.map(selection => UtilSelection.shrinkToActive(selection));
    }

    static getActiveInVisualMode(anchor: Position, active: Position): Position;
    static getActiveInVisualMode(selection: Selection): Position;
    static getActiveInVisualMode(first: Position | Selection, second?: Position): Position {
        let active: Position;
        let isReversed: boolean;

        if (second) {
            isReversed = (first as Position).isAfter(second);
            active = second;
        }
        else {
            isReversed = (first as Selection).isReversed;
            active = (first as Selection).active;
        }

        return !isReversed && active.character > 0
            ? active.translate(0, -1)
            : active;
    }

}
