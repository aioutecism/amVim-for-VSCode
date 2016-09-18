import {window, Position} from 'vscode';
import {Configuration} from '../Configuration';
import {Motion} from './Motion';
import {WordCharacterKind, UtilWord} from '../Utils/Word';

enum MotionWordDirection {Previous, Next};
enum MotionWordMatchKind {Start, End, Both};

export class MotionWord extends Motion {

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
        let previousCharacterKind: WordCharacterKind = null;

        if (this.direction === MotionWordDirection.Next) {
            while (line < document.lineCount) {
                const text = document.lineAt(line).text + '\n';
                let character = line === from.line ? from.character : 0;

                while (character < text.length) {
                    const currentCharacterKind = UtilWord.getCharacterKind(
                        text.charCodeAt(character), this.useBlankSeparatedStyle);

                    if (previousCharacterKind !== null && previousCharacterKind !== currentCharacterKind) {
                        let startPosition: Position;
                        let endPosition: Position;

                        if (currentCharacterKind !== WordCharacterKind.Blank) {
                            startPosition = new Position(line, character);
                        }
                        if (previousCharacterKind !== WordCharacterKind.Blank) {
                            endPosition = previousPosition;
                            if (endPosition.isEqual(from)) {
                                endPosition = undefined;
                            }
                            else {
                                if (option.isInclusive) {
                                    endPosition = endPosition.translate(0, +1);
                                }
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
                    const currentCharacterKind = UtilWord.getCharacterKind(
                        text.charCodeAt(character), this.useBlankSeparatedStyle);

                    if (previousCharacterKind !== null && previousCharacterKind !== currentCharacterKind) {
                        let startPosition: Position;
                        let endPosition: Position;

                        if (previousCharacterKind !== WordCharacterKind.Blank) {
                            startPosition = previousPosition;
                            if (startPosition.isEqual(from)) {
                                startPosition = undefined;
                            }
                        }
                        if (currentCharacterKind !== WordCharacterKind.Blank) {
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
