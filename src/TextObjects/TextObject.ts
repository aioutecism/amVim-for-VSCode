import {window, TextDocument, Position, Range} from 'vscode';

export abstract class TextObject {

    protected isInclusive: boolean;

    /**
     * Override this to return start range of text object or null if not found.
     */
    public findStartRange(document:TextDocument, anchor: Position): Range {
        throw new Error('findStartPosition is not implemented.');
    }

    /**
     * Override this to return end range of text object or null if not found.
     */
    public findEndRange(document:TextDocument, anchor: Position): Range {
        throw new Error('findEndPosition is not implemented.');
    }

    apply(anchor: Position): Range {
        if (this.isInclusive === undefined) {
            throw new Error('isInclusive is not set.');
        }

        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return null;
        }

        const document = activeTextEditor.document;

        const startRange = this.findStartRange(document, anchor);
        if (startRange === null) {
            return null;
        }

        const endRange = this.findEndRange(document, anchor);
        if (endRange === null) {
            return null;
        }

        return this.createRangeDueToIsInclusive(startRange, endRange);
    }

    protected createRangeDueToIsInclusive(startRange: Range, endRange: Range) {
        return this.isInclusive
            ? new Range(startRange.start, endRange.end)
            : new Range(startRange.end, endRange.start);
    }
}
