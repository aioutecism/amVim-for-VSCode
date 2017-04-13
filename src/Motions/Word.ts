import {window, TextDocument, Position} from 'vscode';
import {Motion} from './Motion';
import {WordCharacterKind, UtilWord} from '../Utils/Word';

enum MotionWordDirection {Prev, Next}
enum MotionWordMatchKind {Start, End, Both}

export class MotionWord extends Motion {

    private n: number;
    private useBlankSeparatedStyle: boolean;
    private direction: MotionWordDirection;
    private matchKind: MotionWordMatchKind;

    constructor(args: {
        n?: number,
        useBlankSeparatedStyle?: boolean,
    } = {}) {
        super();

        this.n = args.n === undefined ? 1 : args.n;
        this.useBlankSeparatedStyle = args.useBlankSeparatedStyle === undefined ? false : args.useBlankSeparatedStyle;
    }

    static nextStart(args: {
        n?: number,
        useBlankSeparatedStyle?: boolean,
    } = {}): Motion {
        const obj = new MotionWord(args);
        obj.direction = MotionWordDirection.Next;
        obj.matchKind = MotionWordMatchKind.Start;
        return obj;
    }

    static nextEnd(args: {
        n?: number,
        useBlankSeparatedStyle?: boolean,
    } = {}): Motion {
        const obj = new MotionWord(args);
        obj.direction = MotionWordDirection.Next;
        obj.matchKind = MotionWordMatchKind.End;
        return obj;
    }

    static prevStart(args: {
        n?: number,
        useBlankSeparatedStyle?: boolean,
    } = {}): Motion {
        const obj = new MotionWord(args);
        obj.direction = MotionWordDirection.Prev;
        obj.matchKind = MotionWordMatchKind.Start;
        return obj;
    }

    static prevEnd(args: {
        n?: number,
        useBlankSeparatedStyle?: boolean,
    } = {}): Motion {
        const obj = new MotionWord(args);
        obj.direction = MotionWordDirection.Prev;
        obj.matchKind = MotionWordMatchKind.End;
        return obj;
    }

    apply(
        from: Position,
        option: {
            isInclusive?: boolean,
            isChangeAction?: boolean,
            shouldCrossLines?: boolean,
        } = {}
    ): Position {
        option.isInclusive = option.isInclusive === undefined ? false : option.isInclusive;
        option.isChangeAction = option.isChangeAction === undefined ? false : option.isChangeAction;
        option.shouldCrossLines = option.shouldCrossLines === undefined ? true : option.shouldCrossLines;

        from = super.apply(from);

        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return from;
        }

        const document = activeTextEditor.document;

        let matchKind = this.matchKind;

        for (let i = 0; i < this.n; i++) {
            // Match both start and end on last round if used in change action.
            if (i === this.n - 1 && option.isChangeAction && matchKind === MotionWordMatchKind.Start) {
                matchKind = MotionWordMatchKind.Both;
            }

            const result = this.applyOnce(
                document,
                from,
                matchKind,
                {
                    isInclusive: option.isInclusive,
                    shouldCrossLines: option.shouldCrossLines,
                },
            );

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
        matchKind: MotionWordMatchKind,
        option: {
            isInclusive: boolean,
            shouldCrossLines: boolean,
        },
    ): {
        to: Position,
        shouldStop: boolean,
    } {
        let line = from.line;
        let lastPosition: Position | undefined;
        let lastCharacterKind: WordCharacterKind | undefined;

        if (this.direction === MotionWordDirection.Next) {
            while (line < document.lineCount) {
                const text = document.lineAt(line).text + '\n';
                let character = line === from.line ? from.character : 0;

                while (character < text.length) {
                    const currentCharacterKind = UtilWord.getCharacterKind(
                        text.charCodeAt(character), this.useBlankSeparatedStyle);

                    if (lastPosition !== undefined && lastCharacterKind !== currentCharacterKind) {
                        let startPosition: Position | undefined;
                        let endPosition: Position | undefined;

                        if (currentCharacterKind !== WordCharacterKind.Blank) {
                            startPosition = new Position(line, character);
                        }
                        if (lastCharacterKind !== WordCharacterKind.Blank) {
                            endPosition = lastPosition;
                            if (endPosition.isEqual(from)) {
                                endPosition = undefined;
                            }
                            else {
                                if (option.isInclusive) {
                                    endPosition = endPosition.translate(0, +1);
                                }
                            }
                        }

                        if (matchKind === MotionWordMatchKind.Start) {
                            if (startPosition !== undefined) {
                                return {
                                    to: startPosition,
                                    shouldStop: false,
                                };
                            }
                        }
                        else if (matchKind === MotionWordMatchKind.End) {
                            if (endPosition !== undefined) {
                                return {
                                    to: endPosition,
                                    shouldStop: false,
                                };
                            }
                        }
                        else if (matchKind === MotionWordMatchKind.Both) {
                            if (endPosition !== undefined) {
                                return {
                                    to: endPosition,
                                    shouldStop: false,
                                };
                            }
                            else if (startPosition !== undefined) {
                                return {
                                    to: startPosition,
                                    shouldStop: false,
                                };
                            }
                        }
                    }

                    lastPosition = new Position(line, character);
                    lastCharacterKind = currentCharacterKind;
                    character++;
                }

                if (! option.shouldCrossLines) {
                    return {
                        to: document.lineAt(line).range.end,
                        shouldStop: true,
                    };
                }

                line++;
            }

            // Return end position if matching failed.
            return {
                to: document.lineAt(document.lineCount - 1).range.end,
                shouldStop: true,
            };
        }
        else if (this.direction === MotionWordDirection.Prev) {
            while (line >= 0) {
                const text = document.lineAt(line).text + '\n';
                let character = line === from.line ? from.character : text.length - 1;

                while (character >= 0) {
                    const currentCharacterKind = UtilWord.getCharacterKind(
                        text.charCodeAt(character), this.useBlankSeparatedStyle);

                    if (lastPosition !== undefined && lastCharacterKind !== currentCharacterKind) {
                        let startPosition: Position | undefined;
                        let endPosition: Position | undefined;

                        if (lastCharacterKind !== WordCharacterKind.Blank) {
                            startPosition = lastPosition;
                            if (startPosition.isEqual(from)) {
                                startPosition = undefined;
                            }
                        }
                        if (currentCharacterKind !== WordCharacterKind.Blank) {
                            endPosition = new Position(line, character);
                        }

                        if (matchKind === MotionWordMatchKind.Start) {
                            if (startPosition !== undefined) {
                                return {
                                    to: startPosition,
                                    shouldStop: false,
                                };
                            }
                        }
                        else if (matchKind === MotionWordMatchKind.End) {
                            if (endPosition !== undefined) {
                                return {
                                    to: endPosition,
                                    shouldStop: false,
                                };
                            }
                        }
                        else if (matchKind === MotionWordMatchKind.Both) {
                            if (endPosition !== undefined) {
                                return {
                                    to: endPosition,
                                    shouldStop: false,
                                };
                            }
                            else if (startPosition !== undefined) {
                                return {
                                    to: startPosition,
                                    shouldStop: false,
                                };
                            }
                        }
                    }

                    lastPosition = new Position(line, character);
                    lastCharacterKind = currentCharacterKind;
                    character--;
                }

                if (! option.shouldCrossLines) {
                    return {
                        to: document.lineAt(line).range.start,
                        shouldStop: true,
                    };
                }

                line--;
            }

            // Return start position if matching failed.
            return {
                to: new Position(0, 0),
                shouldStop: true,
            };
        }
        else {
            throw new Error(`Direction is invalid: ${this.direction}`);
        }
    }

}
