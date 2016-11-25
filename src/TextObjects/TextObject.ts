import {window, TextDocument, Position, Range} from 'vscode';
import {UtilRange} from '../Utils/Range';

export abstract class TextObject {

    protected isInclusive: boolean;

    protected _isLinewise: boolean | undefined = undefined;
    public get isLinewise() {
        return this._isLinewise === undefined ? false : this._isLinewise;
    }

    /**
     * Override this to return start range of text object or null if not found.
     */
    findStartRange(document: TextDocument, anchor: Position): Range | null {
        throw new Error('findStartPosition is not implemented.');
    }

    /**
     * Override this to return end range of text object or null if not found.
     */
    findEndRange(document: TextDocument, anchor: Position): Range | null {
        throw new Error('findEndPosition is not implemented.');
    }

    apply(anchor: Position): Range | null {
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

        let range = this.createRangeDueToIsInclusive(startRange, endRange);

        if (this._isLinewise) {
            range = UtilRange.toLinewise(range, document);
        }

        return range;
    }

    protected createRangeDueToIsInclusive(startRange: Range, endRange: Range): Range {
        return this.isInclusive
            ? new Range(startRange.start, endRange.end)
            : new Range(startRange.end, endRange.start);
    }
}
