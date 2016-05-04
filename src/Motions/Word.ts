import {window, Position} from 'vscode';
import {Configuration} from '../Configuration';
import {Motion} from './Motion';

enum MotionWordDirection {Previous, Next};
enum MotionWordMatchKind {Start, End, Both};

enum MotionWordCharacterKind {Regular, Separator, Blank}

export class MotionWord extends Motion {

    private static blankSeparators = ' \f\n\r\t\v​\u00a0\u1680​\u180e\u2000​\u2001​\u2002​\u2003​\u2004\u2005​\u2006​\u2007​\u2008\u2009​\u200a​\u2028\u2029\u202f\u205f​\u3000\ufeff';
    private static characterKindCache: {[key: number]: MotionWordCharacterKind};

    static updateCharacterKindCache(wordSeparators: string): void {
        this.characterKindCache = {};

        for (let i = 0; i < this.blankSeparators.length; i++) {
            this.characterKindCache[this.blankSeparators.charCodeAt(i)] = MotionWordCharacterKind.Blank;
        }

        for (let i = 0, len = wordSeparators.length; i < len; i++) {
            this.characterKindCache[wordSeparators.charCodeAt(i)] = MotionWordCharacterKind.Separator;
        }
    }

    private useBlankSeparatedStyle: boolean;
    private direction: MotionWordDirection;
    private matchKind: MotionWordMatchKind;

    constructor(args: {useBlankSeparatedStyle?: boolean} = {}) {
        super();
        args = Object.assign({useBlankSeparatedStyle: false}, args);

        this.useBlankSeparatedStyle = args.useBlankSeparatedStyle;
    }

    static nextStart(args: {useBlankSeparatedStyle?: boolean} = {}): Motion {
        const obj = new MotionWord(args);
        obj.direction = MotionWordDirection.Next;
        obj.matchKind = MotionWordMatchKind.Start;
        return obj;
    }

    static nextEnd(args: {useBlankSeparatedStyle?: boolean} = {}): Motion {
        const obj = new MotionWord(args);
        obj.direction = MotionWordDirection.Next;
        obj.matchKind = MotionWordMatchKind.End;
        return obj;
    }

    static prevStart(args: {useBlankSeparatedStyle?: boolean} = {}): Motion {
        const obj = new MotionWord(args);
        obj.direction = MotionWordDirection.Previous;
        obj.matchKind = MotionWordMatchKind.Start;
        return obj;
    }

    static prevEnd(args: {useBlankSeparatedStyle?: boolean} = {}): Motion {
        const obj = new MotionWord(args);
        obj.direction = MotionWordDirection.Previous;
        obj.matchKind = MotionWordMatchKind.End;
        return obj;
    }

    private getCharacterKind(charCode: number, useBlankSeparatedStyle: boolean): MotionWordCharacterKind {
        let characterKind = MotionWord.characterKindCache[charCode];

        if (characterKind === undefined) {
            characterKind = MotionWordCharacterKind.Regular;
        }

        if (useBlankSeparatedStyle) {
            // Treat separator as regular character.
            if (characterKind === MotionWordCharacterKind.Separator) {
                characterKind = MotionWordCharacterKind.Regular;
            }
        }

        return characterKind;
    }

    apply(from: Position, option: {isInclusive?: boolean, isChangeAction?: boolean} = {}): Position {
        option.isInclusive = option.isInclusive === undefined ? false : option.isInclusive;
        option.isChangeAction = option.isChangeAction === undefined ? false : option.isChangeAction;

        // Match both start and end if used in change action.
        if (option.isChangeAction && this.matchKind === MotionWordMatchKind.Start) {
            this.matchKind = MotionWordMatchKind.Both;
        }

        from = super.apply(from);

        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return from;
        }

        const document = activeTextEditor.document;

        let line = from.line;
        let previousPosition: Position = null;
        let previousCharacterKind: MotionWordCharacterKind = null;

        if (this.direction === MotionWordDirection.Next) {
            while (line < document.lineCount) {
                const text = document.lineAt(line).text + '\n';
                let character = line === from.line ? from.character : 0;

                while (character < text.length) {
                    const currentCharacterKind = this.getCharacterKind(
                        text.charCodeAt(character), this.useBlankSeparatedStyle);

                    if (previousCharacterKind !== null && previousCharacterKind !== currentCharacterKind) {
                        let startPosition: Position;
                        let endPosition: Position;

                        if (currentCharacterKind !== MotionWordCharacterKind.Blank) {
                            startPosition = new Position(line, character);
                        }
                        if (previousCharacterKind !== MotionWordCharacterKind.Blank) {
                            endPosition = option.isInclusive ? previousPosition.translate(0, +1) : previousPosition;
                            if (endPosition.isEqual(from)) {
                                endPosition = undefined;
                            }
                        }

                        if (this.matchKind === MotionWordMatchKind.Start) {
                            if (startPosition !== undefined) {
                                return startPosition;
                            }
                        }
                        else if (this.matchKind === MotionWordMatchKind.End) {
                            if (endPosition !== undefined) {
                                return endPosition;
                            }
                        }
                        else if (this.matchKind === MotionWordMatchKind.Both) {
                            if (endPosition !== undefined) {
                                return endPosition;
                            }
                            else if (startPosition !== undefined) {
                                return startPosition;
                            }
                        }
                    }

                    previousPosition = new Position(line, character);
                    previousCharacterKind = currentCharacterKind;
                    character++;
                }

                line++;
            }

            // Return end position if matching failed.
            return document.lineAt(document.lineCount - 1).range.end;
        }
        else if (this.direction === MotionWordDirection.Previous) {
            while (line >= 0) {
                const text = document.lineAt(line).text + '\n';
                let character = line === from.line ? from.character : text.length - 1;

                while (character >= 0) {
                    const currentCharacterKind = this.getCharacterKind(
                        text.charCodeAt(character), this.useBlankSeparatedStyle);

                    if (previousCharacterKind !== null && previousCharacterKind !== currentCharacterKind) {
                        let startPosition: Position;
                        let endPosition: Position;

                        if (previousCharacterKind !== MotionWordCharacterKind.Blank) {
                            startPosition = previousPosition;
                            if (startPosition.isEqual(from)) {
                                startPosition = undefined;
                            }
                        }
                        if (currentCharacterKind !== MotionWordCharacterKind.Blank) {
                            endPosition = new Position(line, character);
                        }

                        if (this.matchKind === MotionWordMatchKind.Start) {
                            if (startPosition !== undefined) {
                                return startPosition;
                            }
                        }
                        else if (this.matchKind === MotionWordMatchKind.End) {
                            if (endPosition !== undefined) {
                                return endPosition;
                            }
                        }
                        else if (this.matchKind === MotionWordMatchKind.Both) {
                            if (endPosition !== undefined) {
                                return endPosition;
                            }
                            else if (startPosition !== undefined) {
                                return startPosition;
                            }
                        }
                    }

                    previousPosition = new Position(line, character);
                    previousCharacterKind = currentCharacterKind;
                    character--;
                }

                line--;
            }

            // Return start position if matching failed.
            return new Position(0, 0);
        }
        else {
            throw new Error(`Direction is invalid: ${this.direction}`);
        }
    }

}
