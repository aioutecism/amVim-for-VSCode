import {window, Position} from 'vscode';
import {Motion} from './Motion';

export enum MotionWordPosition {NEXT_START, NEXT_END, PREV_START, PREV_END, NEXT_BOUNDARY};

export class MotionWord extends Motion {

    private wordDelta: MotionWordPosition;
    private useBoundaryIfChange = false;

    private static wordSeparators = './\\\\()"\'\\-:,.;<>~!@#$%^&*|+=\\[\\]{}`~?';
    private static blankSeparators = '\\s';

    separators: string;

    constructor(options: {useBlankSeparatedStyle?: boolean} = {}) {
        super();
        options = Object.assign({useBlankSeparatedStyle: false}, options);

        this.separators = options.useBlankSeparatedStyle
            ? MotionWord.blankSeparators : MotionWord.wordSeparators;
    }

    static nextStartOrBoundaryIfChange(args: {useBlankSeparatedStyle?: boolean} = {}): Motion {
        const obj = MotionWord.nextStart(args);
        (obj as MotionWord).useBoundaryIfChange = true;

        return obj;
    }

    static nextStart(args: {useBlankSeparatedStyle?: boolean} = {}): Motion {
        const obj = new MotionWord(args);
        obj.wordDelta = MotionWordPosition.NEXT_START;
        return obj;
    }

    static nextEnd(args: {useBlankSeparatedStyle?: boolean} = {}): Motion {
        const obj = new MotionWord(args);
        obj.wordDelta = MotionWordPosition.NEXT_END;
        return obj;
    }

    static prevStart(args: {useBlankSeparatedStyle?: boolean} = {}): Motion {
        const obj = new MotionWord(args);
        obj.wordDelta = MotionWordPosition.PREV_START;
        return obj;
    }

    static prevEnd(args: {useBlankSeparatedStyle?: boolean} = {}): Motion {
        const obj = new MotionWord(args);
        obj.wordDelta = MotionWordPosition.PREV_END;
        return obj;
    }

    createCharacterDelta(text: string, wordDelta: MotionWordPosition, fromCharacter: number, isInclusive?: boolean) {

        if (wordDelta === MotionWordPosition.NEXT_START) {
            text = text.substr(fromCharacter);

            const matches = text.match(new RegExp(
                `^(\\s+)?((?:[${this.separators}]+|[^\\s${this.separators}]+)\\s*)?`
            ));

            if (matches[1]) {
                // Not in a word; found whitespace after cursor.
                return matches[1].length;
            }

            else if (matches[2]) {
                // Found some word separators, or some word chars.
                // NB: Any whitespace after the word is included.
                return matches[2].length;
            }

            return 0;
        }

        else if (wordDelta === MotionWordPosition.NEXT_END) {
            text = text.substr(fromCharacter + 1);

            const matches = text.match(new RegExp(
                `^(\\s+)?((?:[${this.separators}]+|[^\\s${this.separators}]+))?`
            ));

            return (isInclusive) ?
                matches[0].length + 1 :
                matches[0].length;
        }

        else if (wordDelta === MotionWordPosition.PREV_START) {
            text = text
                .substr(0, fromCharacter + 1)
                .split('').reverse().join('');

            return -this.createCharacterDelta(text, MotionWordPosition.NEXT_END, 0);
        }

        else if (wordDelta === MotionWordPosition.PREV_END) {
            text = text
                .substr(0, fromCharacter + 1)
                .split('').reverse().join('');

            return -this.createCharacterDelta(text, MotionWordPosition.NEXT_START, 0);
        }

        else if (wordDelta === MotionWordPosition.NEXT_BOUNDARY) {
            const endDelta = this.createCharacterDelta(text, MotionWordPosition.NEXT_END, fromCharacter, isInclusive);
            const startDelta = this.createCharacterDelta(text, MotionWordPosition.NEXT_START, fromCharacter, isInclusive);
            return Math.min(endDelta, startDelta);
        }

    }

    apply(from: Position, option: {isInclusive?: boolean, cwNeedsFixup?: boolean} = {}): Position {
        option.isInclusive = option.isInclusive === undefined ? false : option.isInclusive;
        option.cwNeedsFixup = option.cwNeedsFixup === undefined ? false : option.cwNeedsFixup;

        if (option.cwNeedsFixup && this.useBoundaryIfChange) {
            this.wordDelta = MotionWordPosition.NEXT_BOUNDARY;
        }

        from = super.apply(from);

        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor || this.wordDelta === undefined) {
            return from;
        }

        const document = activeTextEditor.document;

        let toLine = from.line;
        let toCharacter = from.character;

        // TODO: Move to next line if needed

        let targetText = document.lineAt(toLine).text;

        toCharacter += this.createCharacterDelta(
            targetText, this.wordDelta, toCharacter, option.isInclusive
        );

        return new Position(toLine, toCharacter);
    }

}
