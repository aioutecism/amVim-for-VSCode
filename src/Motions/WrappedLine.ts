import { commands, Position, Selection, window } from 'vscode';
import { Motion } from './Motion';

export class MotionWrappedLine extends Motion {
    readonly cursorMove: { to: string; by?: string; value?: number };

    constructor(args: {
        isLinewise?: boolean;
        isCharacterUpdated?: boolean;
        cursorMove: { to: string; by?: string; value?: number };
    }) {
        super(args);
        this.cursorMove = args.cursorMove;
    }

    static firstNonBlank(): Motion {
        return new MotionWrappedLine({
            cursorMove: {
                to: 'wrappedLineFirstNonWhitespaceCharacter',
            },
        });
    }

    static start(): Motion {
        return new MotionWrappedLine({
            cursorMove: {
                to: 'wrappedLineStart',
            },
        });
    }

    static end(): Motion {
        return new MotionWrappedLine({
            cursorMove: {
                to: 'wrappedLineEnd',
            },
        });
    }

    static middle(): Motion {
        return new MotionWrappedLine({
            cursorMove: {
                to: 'wrappedLineColumnCenter',
            },
        });
    }

    static up(args: { n?: number } = {}): Motion {
        return new MotionWrappedLine({
            isLinewise: true,
            isCharacterUpdated: false,
            cursorMove: {
                to: 'up',
                by: 'wrappedLine',
                value: args.n === undefined ? 1 : args.n,
            },
        });
    }

    static down(args: { n?: number } = {}): Motion {
        return new MotionWrappedLine({
            isLinewise: true,
            isCharacterUpdated: false,
            cursorMove: {
                to: 'down',
                by: 'wrappedLine',
                value: args.n === undefined ? 1 : args.n,
            },
        });
    }

    async apply(from: Position, option: { isInclusive?: boolean } = {}): Promise<Position> {
        option.isInclusive = option.isInclusive === undefined ? false : option.isInclusive;

        const activeTextEditor = window.activeTextEditor;
        if (!activeTextEditor) {
            return from;
        }

        const save = activeTextEditor.selections;

        if (!from.isEqual(save[0].active)) {
            activeTextEditor.selections = [new Selection(save[0].anchor, from)];
        }
        await commands.executeCommand('cursorMove', {
            ...this.cursorMove,
            select: !activeTextEditor.selection.isEmpty,
        });
        const to = activeTextEditor.selection.active;

        activeTextEditor.selections = save;

        // this behaves differently depending if it is a movement or selection
        if (this.cursorMove.to === 'wrappedLineEnd' && !option.isInclusive) {
            return to.translate(0, -1);
        }

        if (!this.isLinewise) {
            return to;
        }

        // don't change the column on the top or bottom lines
        if (from.line === 0 && to.line === 0 && to.character === 0) {
            return from;
        }
        const lastLine = activeTextEditor.document.lineCount - 1;
        if (
            from.line === lastLine &&
            to.line === lastLine &&
            to.character === activeTextEditor.document.lineAt(lastLine).text.length
        ) {
            return from;
        }

        return to;
    }
}
