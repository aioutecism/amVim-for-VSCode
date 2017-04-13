import {window, TextDocument, Position} from 'vscode';
import {Motion} from './Motion';

enum Direction {Prev, Next}

export class MotionParagraph extends Motion {

    private direction: Direction;
    private n: number;

    constructor(args: {direction: Direction, n?: number}) {
        args.n = args.n === undefined ? 1 : args.n;

        super();

        this.direction = args.direction;
        this.n = args.n;
    }

    static prev(args: {n?: number}): Motion {
        return new MotionParagraph({
            direction: Direction.Prev,
            n: args.n,
        });
    }

    static next(args: {n?: number}): Motion {
        return new MotionParagraph({
            direction: Direction.Next,
            n: args.n,
        });
    }

    apply(from: Position): Position {
        from = super.apply(from);

        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor || this.direction === undefined || this.n === undefined) {
            return from;
        }

        const document = activeTextEditor.document;

        for (let i = 0; i < this.n; i++) {
            const result = this.applyOnce(document, from);

            from = result.to;

            if (result.shouldStop) {
                break;
            }
        }

        return from;
    }

    private applyOnce(
        document: TextDocument,
        from: Position,
    ): {
        to: Position,
        shouldStop: boolean,
    } {
        let toLine: number | undefined = undefined;
        let toCharacter = 0;
        let shouldStop = false;

        // Skip first group of empty lines if currently on empty line.
        let shouldSkip = MotionParagraph.isLineEmpty(document, from.line);

        if (this.direction === Direction.Prev) {
            for (let i = from.line - 1; i >= 0; i--) {
                const isLineEmpty = MotionParagraph.isLineEmpty(document, i);

                if (shouldSkip) {
                    if (!isLineEmpty) {
                        shouldSkip = false;
                    }
                    continue;
                }

                if (isLineEmpty) {
                    toLine = i;
                    break;
                }
            }

            if (toLine === undefined) {
                shouldStop = true;
                toLine = 0;
            }
        }
        else {
            for (let i = from.line + 1; i < document.lineCount; i++) {
                const isLineEmpty = MotionParagraph.isLineEmpty(document, i);

                if (shouldSkip) {
                    if (!isLineEmpty) {
                        shouldSkip = false;
                    }
                    continue;
                }

                if (isLineEmpty) {
                    toLine = i;
                    break;
                }
            }

            if (toLine === undefined) {
                shouldStop = true;
                toLine = document.lineCount - 1;
                toCharacter = document.lineAt(toLine).text.length;
            }
        }

        return {
            to: new Position(toLine, toCharacter),
            shouldStop: shouldStop,
        };
    }

    private static isLineEmpty(document: TextDocument, line: number): boolean {
        return document.lineAt(line).text === '';
    }

}
