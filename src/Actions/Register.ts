import { env, window, Position, Range } from 'vscode';
import { StaticReflect } from '../LanguageExtensions/StaticReflect';
import { SymbolMetadata } from '../Symbols/Metadata';
import { ActionMoveCursor } from './MoveCursor';
import { ActionSelection } from './Selection';
import { Motion } from '../Motions/Motion';
import { MotionCharacter } from '../Motions/Character';
import { MotionDirection } from '../Motions/Direction';
import { MotionLine } from '../Motions/Line';
import { TextObject } from '../TextObjects/TextObject';
import { UtilRange } from '../Utils/Range';
import { UtilText } from '../Utils/Text';
import { Configuration } from '../Configuration';

export class Register {
    readonly text: string;
    readonly isLinewise: boolean;

    private _lineCount: number | undefined = undefined;
    public get lineCount(): number {
        if (this._lineCount === undefined) {
            this._lineCount = UtilText.getLineCount(this.text);
        }
        return this._lineCount;
    }

    constructor(args: { text: string; isLinewise?: boolean }) {
        this.text = args.text;
        this.isLinewise = args.isLinewise === undefined ? false : args.isLinewise;
    }
}

export class ActionRegister {
    private static stash: Register;

    static GetStash(): Register {
        return ActionRegister.stash;
    }

    static async yankRanges(args: { ranges: Range[]; isLinewise: boolean }): Promise<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
            return Promise.resolve(false);
        }

        const document = activeTextEditor.document;

        if (args.isLinewise) {
            args.ranges = args.ranges.map((range) => UtilRange.toLinewise(range, document));
        }

        args.ranges = UtilRange.unionOverlaps(args.ranges);

        const text = args.ranges
            .map((range) => {
                return document.getText(document.validateRange(range));
            })
            .join('');

        if (Configuration.useSystemClipboard === true) {
            // Write to clipboard but then continue to allow
            // for saving `isLinewise` state
            await env.clipboard.writeText(text);
        }

        ActionRegister.stash = new Register({
            text: text,
            isLinewise: args.isLinewise,
        });

        return Promise.resolve(true);
    }

    static yankByMotions(args: { motions: Motion[]; isChangeAction?: boolean }): Thenable<boolean> {
        args.isChangeAction = args.isChangeAction === undefined ? false : args.isChangeAction;

        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
            return Promise.resolve(false);
        }

        const isLinewise = args.motions.some((motion) => motion.isLinewise);

        const promisedRanges = activeTextEditor.selections.map(async (selection) => {
            const start = selection.active;
            const end = await args.motions.reduce((promisedPosition, motion) => {
                return promisedPosition.then((position) =>
                    motion.apply(position, {
                        isInclusive: true,
                        shouldCrossLines: false,
                        isChangeAction: args.isChangeAction,
                    }),
                );
            }, Promise.resolve(start));
            return new Range(start, end);
        });
        return Promise.all(promisedRanges).then((ranges) => {
            return ActionRegister.yankRanges({
                ranges: ranges,
                isLinewise: isLinewise,
            });
        });
    }

    static async yankByTextObject(args: { textObject: TextObject }): Promise<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
            return Promise.resolve(false);
        }

        const document = activeTextEditor.document;

        let ranges: Range[] = [];

        activeTextEditor.selections.forEach((selection) => {
            const match = args.textObject.apply(selection.active);
            if (match) {
                ranges.push(match);
            }
        });

        // `ranges` is already line-wise so yankRanges is not suitable.

        ranges = UtilRange.unionOverlaps(ranges);

        const text = ranges
            .map((range) => {
                return document.getText(document.validateRange(range));
            })
            .join('');

        if (Configuration.useSystemClipboard === true) {
            // Write to clipboard but then continue to allow
            // for saving `isLinewise` state
            await env.clipboard.writeText(text);
        }

        ActionRegister.stash = new Register({
            text: text,
            isLinewise: args.textObject.isLinewise,
        });

        return Promise.resolve(true);
    }

    static yankSelections(args: { isLinewise?: boolean }): Thenable<boolean> {
        args.isLinewise = args.isLinewise === undefined ? false : args.isLinewise;

        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
            return Promise.resolve(false);
        }

        return ActionRegister.yankRanges({
            ranges: activeTextEditor.selections,
            isLinewise: args.isLinewise,
        });
    }

    static yankLines(args: { n?: number }): Thenable<boolean> {
        args.n = args.n === undefined ? 1 : args.n;

        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
            return Promise.resolve(false);
        }

        const ranges =
            args.n === 1
                ? activeTextEditor.selections
                : activeTextEditor.selections.map((selection) =>
                      selection.with({
                          end: selection.end.translate(args.n! - 1),
                      }),
                  );

        return ActionRegister.yankRanges({
            ranges: ranges,
            isLinewise: true,
        });
    }

    @StaticReflect.metadata(SymbolMetadata.Action.isChange, true)
    static async putAfter(args: { n?: number }): Promise<boolean> {
        args.n = args.n === undefined ? 1 : args.n;

        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
            return Promise.resolve(false);
        }

        if (Configuration.useSystemClipboard === true) {
            const text = await env.clipboard.readText();
            const existingStash = ActionRegister.stash || {};

            // Don't add a new register if:
            // - there is nothing returned from the system clipboard
            // - the existing register has the text already
            if (text && existingStash.text !== text) {
                ActionRegister.stash = new Register({
                    text,
                    isLinewise: false,
                });
            }
        }

        if (!ActionRegister.stash) {
            return Promise.resolve(false);
        }

        const stash = ActionRegister.stash;

        const putPositions = activeTextEditor.selections.map((selection) => {
            return stash.isLinewise
                ? new Position(selection.active.line + 1, 0)
                : selection.active.translate(0, +1);
        });

        const textToPut = stash.text.repeat(args.n);

        return ActionSelection.shrinkToActives()
            .then(() => {
                return activeTextEditor.edit((editBuilder) => {
                    putPositions.forEach((position) => {
                        editBuilder.insert(position, textToPut);
                    });
                });
            })
            .then(() => {
                if (stash.isLinewise) {
                    return ActionMoveCursor.byMotions({
                        motions: [MotionCharacter.down(), MotionLine.firstNonBlank()],
                    });
                } else if (stash.lineCount > 1) {
                    return ActionMoveCursor.byMotions({
                        motions: [MotionCharacter.right()],
                    });
                } else {
                    const characters = textToPut.length;
                    return ActionMoveCursor.byMotions({
                        motions: [MotionCharacter.right({ n: characters })],
                    });
                }
            });
    }

    @StaticReflect.metadata(SymbolMetadata.Action.isChange, true)
    static async putBefore(args: { n?: number }): Promise<boolean> {
        args.n = args.n === undefined ? 1 : args.n;

        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
            return Promise.resolve(false);
        }

        if (Configuration.useSystemClipboard === true) {
            const text = await env.clipboard.readText();
            const existingStash = ActionRegister.stash || {};

            // Don't add a new register if:
            // - there is nothing returned from the system clipboard
            // - the existing register has the text already
            if (text && existingStash.text !== text) {
                ActionRegister.stash = new Register({
                    text,
                    isLinewise: false,
                });
            }
        }

        if (!ActionRegister.stash) {
            return Promise.resolve(false);
        }

        const stash = ActionRegister.stash;

        const putPositions = activeTextEditor.selections.map((selection) => {
            return stash.isLinewise ? selection.active.with(undefined, 0) : selection.active;
        });

        const textToPut = stash.text.repeat(args.n);

        return ActionSelection.shrinkToActives()
            .then(() => {
                return activeTextEditor.edit((editBuilder) => {
                    putPositions.forEach((position) => {
                        editBuilder.insert(position, textToPut);
                    });
                });
            })
            .then(() => {
                if (stash.isLinewise) {
                    return ActionMoveCursor.byMotions({
                        motions: [
                            MotionCharacter.up({
                                n: UtilText.getLineCount(textToPut) - 1,
                            }),
                            MotionLine.firstNonBlank(),
                        ],
                    });
                } else if (stash.lineCount > 1) {
                    return ActionMoveCursor.byMotions({
                        motions: [
                            MotionDirection.prev({
                                n: textToPut.length - args.n!,
                            }),
                        ],
                    });
                } else {
                    return ActionMoveCursor.byMotions({
                        motions: [MotionCharacter.left()],
                    });
                }
            });
    }
}
