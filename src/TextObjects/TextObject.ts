import {window, Position, Range} from 'vscode';

export abstract class TextObject {

    private isInclusive: boolean;

    /**
     * Override this to return start position of text object or null if not found.
     */
    protected findStartPosition(anchor: Position): Position {
        throw new Error('findStartPosition is not implemented.');
    }

    /**
     * Override this to return end position of text object or null if not found.
     */
    protected findEndPosition(anchor: Position): Position {
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

        const startPosition = this.findStartPosition(anchor);
        if (startPosition === null) {
            return null;
        }

        const endPosition = this.findEndPosition(anchor);
        if (endPosition === null) {
            return null;
        }

        return new Range(startPosition, endPosition);
    }

}
