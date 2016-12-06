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

    private static changeIndentLevel(args: {
        indentLevelOffset: number,
        isVisualMode?: boolean,
        isVisualLineMode?: boolean,
        preferedRelativeRange?: Range,
    }): Thenable<boolean> {
        args.isVisualMode = args.isVisualMode === undefined ? false : args.isVisualMode;
        args.isVisualLineMode = args.isVisualLineMode === undefined ? false : args.isVisualLineMode;

        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        const document = activeTextEditor.document;
        const indentUnit = ActionIndent.getIndentUnit();

        const lineNumbers: {[lineNumber: number]: boolean} = {};

        if (args.preferedRelativeRange) {
            activeTextEditor.selections.forEach(selection => {
                for (let i = selection.active.line; i <= selection.active.line + args.preferedRelativeRange!.end.line; i++) {
                    lineNumbers[i] = true;
                }
            });
        }
        else {
            activeTextEditor.selections.forEach(selection => {
                for (let i = selection.start.line; i <= selection.end.line; i++) {
                    lineNumbers[i] = true;
                }
            });
        }

        return window.activeTextEditor.edit((editBuilder) => {
            Object.keys(lineNumbers).forEach(key => {
                const lineNumber = parseInt(key, 10);

                if (lineNumber < 0 || lineNumber >= document.lineCount) {
                    return;
                }

                const line = document.lineAt(lineNumber);

                const currentIndentLevel = ActionIndent.getIndentLevel(lineNumber);
                let toIndentLevel = args.indentLevelOffset > 0
                    ? Math.floor(currentIndentLevel + args.indentLevelOffset)
                    : Math.ceil(currentIndentLevel + args.indentLevelOffset);

                if (toIndentLevel < 0) {
                    toIndentLevel = 0;
                }

                const indentText = indentUnit.repeat(toIndentLevel);

                editBuilder.replace(new Range(
                    lineNumber, 0,
                    lineNumber, line.firstNonWhitespaceCharacterIndex,
                ), indentText);
            });
        })
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
    static increase(args: {
        isVisualMode?: boolean,
        isVisualLineMode?: boolean,
        preferedRelativeRange?: Range,
    }): Thenable<boolean> {
        return ActionIndent.changeIndentLevel(Object.assign({
            indentLevelOffset: +1,
        }, args));
    }

    @StaticReflect.metadata(SymbolMetadata.Action.isChange, true)
    static decrease(args: {
        isVisualMode?: boolean,
        isVisualLineMode?: boolean,
        preferedRelativeRange?: Range,
    }): Thenable<boolean> {
        return ActionIndent.changeIndentLevel(Object.assign({
            indentLevelOffset: -1,
        }, args));
    }

};
