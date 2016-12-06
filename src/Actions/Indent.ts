import {window, Range} from 'vscode';
import {StaticReflect} from '../LanguageExtensions/StaticReflect';
import {SymbolMetadata} from '../Symbols/Metadata';
import {ActionSelection} from './Selection';
import {ActionMoveCursor} from './MoveCursor';
import {ActionReveal} from './Reveal';
import {MotionLine} from '../Motions/Line';
import {UtilText} from '../Utils/Text';

export class ActionIndent {

    private static getIndentUnit(): string {
        const options = window.activeTextEditor.options;

        if (options.insertSpaces) {
            return ' '.repeat(options.tabSize as number);
        }
        else {
            return '\t';
        }
    }

    private static getIndentLevel(lineNumber: number): number {
        const document = window.activeTextEditor.document;

        if (lineNumber >= document.lineCount) {
            return 0;
        }

        const options = window.activeTextEditor.options;
        const tabSize = options.tabSize as number;

        const line = document.lineAt(lineNumber);

        const indentText = line.text.substr(0, line.firstNonWhitespaceCharacterIndex);
        const tabCount = UtilText.countStringAppearance('\t', indentText);

        let indentLength = tabCount > 0
            ? indentText.length + tabCount * (tabSize - 1)
            : indentText.length;

        return indentLength / tabSize;
    }

    private static changeIndentLevel(
        lineNumbers: number[],
        indentLevelOffset: number,
    ): Thenable<boolean> {
        if (lineNumbers.length === 0) {
            return Promise.resolve(true);
        }

        const document = window.activeTextEditor.document;
        const indentUnit = ActionIndent.getIndentUnit();

        return window.activeTextEditor.edit((editBuilder) => {
            lineNumbers.forEach(lineNumber => {
                const line = document.lineAt(lineNumber);

                const currentIndentLevel = ActionIndent.getIndentLevel(lineNumber);
                let toIndentLevel = indentLevelOffset > 0
                    ? Math.floor(currentIndentLevel + indentLevelOffset)
                    : Math.ceil(currentIndentLevel + indentLevelOffset);

                if (toIndentLevel < 0) {
                    toIndentLevel = 0;
                }

                const indentText = indentUnit.repeat(toIndentLevel);

                editBuilder.replace(new Range(
                    lineNumber, 0,
                    lineNumber, line.firstNonWhitespaceCharacterIndex,
                ), indentText);
            });
        });
    }

    @StaticReflect.metadata(SymbolMetadata.Action.isChange, true)
    static increase(args: {
        isVisualMode?: boolean,
        isVisualLineMode?: boolean,
    }): Thenable<boolean> {
        args.isVisualMode = args.isVisualMode === undefined ? false : args.isVisualMode;
        args.isVisualLineMode = args.isVisualLineMode === undefined ? false : args.isVisualLineMode;

        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        const lineNumbers: number[] = [];
        activeTextEditor.selections.forEach(selection => {
            for (let i = selection.start.line; i <= selection.end.line; i++) {
                lineNumbers.push(i);
            }
        });

        return ActionIndent.changeIndentLevel(lineNumbers, +1)
            .then(() => {
                if (args.isVisualMode || args.isVisualLineMode) {
                    return ActionSelection.shrinkToStarts()
                        .then(() => ActionMoveCursor.byMotions({ motions: [MotionLine.firstNonBlank()] }));
                }
                else {
                    return ActionSelection.shrinkToEnds();
                }
            })
            .then(() => ActionReveal.primaryCursor());
    }

    @StaticReflect.metadata(SymbolMetadata.Action.isChange, true)
    static decrease(args: {
        isVisualMode?: boolean,
        isVisualLineMode?: boolean,
    }): Thenable<boolean> {
        args.isVisualMode = args.isVisualMode === undefined ? false : args.isVisualMode;
        args.isVisualLineMode = args.isVisualLineMode === undefined ? false : args.isVisualLineMode;

        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        const lineNumbers: number[] = [];
        activeTextEditor.selections.forEach(selection => {
            for (let i = selection.start.line; i <= selection.end.line; i++) {
                lineNumbers.push(i);
            }
        });

        return ActionIndent.changeIndentLevel(lineNumbers, -1)
            .then(() => {
                if (args.isVisualMode || args.isVisualLineMode) {
                    return ActionSelection.shrinkToStarts()
                        .then(() => ActionMoveCursor.byMotions({ motions: [MotionLine.firstNonBlank()] }));
                }
                else {
                    return ActionSelection.shrinkToEnds();
                }
            })
            .then(() => ActionReveal.primaryCursor());
    }

};
