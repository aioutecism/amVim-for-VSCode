import {window, TextDocument, Position, Range} from 'vscode';
import {UtilRange} from '../Utils/Range';

export abstract class TextObject {

    protected shouldExpandToLinewise: boolean = false;

    private _isLinewise: boolean = false;
    public get isLinewise() { return this._isLinewise; }

    protected isInclusive: boolean;

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

        if (this.shouldExpandToLinewise) {
            range = this.tryExpandToLinewise(range, document);
        }

        return range;
    }

    protected createRangeDueToIsInclusive(startRange: Range, endRange: Range): Range {
        return this.isInclusive
            ? new Range(startRange.start, endRange.end)
            : new Range(startRange.end, endRange.start);
    }

    private tryExpandToLinewise(range: Range, document: TextDocument): Range {
        if (range.isSingleLine) {
            return range;
        }

        const startLine = document.lineAt(range.start.line);
        const endLine = document.lineAt(range.start.line);

        if (this.isInclusive) {
            if (
                range.start.character === startLine.firstNonWhitespaceCharacterIndex
                && range.end.character === endLine.text.length
            ) {
                range = UtilRange.toLinewise(range, document);
                this._isLinewise = true;
            }
        }
        else {
            if (
                range.start.character === startLine.text.length
                && range.end.character === endLine.firstNonWhitespaceCharacterIndex
            ) {
                range = new Range(
                    range.start.line + 1, 0,
                    range.end.line, 0
                );
                this._isLinewise = true;
            }
        }

        return range;
    }
}
