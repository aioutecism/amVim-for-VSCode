import { window, Range } from 'vscode';
import { StaticReflect } from '../LanguageExtensions/StaticReflect';
import { SymbolMetadata } from '../Symbols/Metadata';
import { ActionInsert } from './Insert';
import { ActionRegister } from './Register';
import { ActionSelection } from './Selection';
import { ActionReveal } from './Reveal';
import { UtilRange } from '../Utils/Range';

export class ActionReplace {
    @StaticReflect.metadata(SymbolMetadata.Action.isChange, true)
    static selectionsWithRegister(args: {
        shouldYank?: boolean;
        isLinewise?: boolean;
    }): Thenable<boolean> {
        args.shouldYank = args.shouldYank === undefined ? false : args.shouldYank;
        args.isLinewise = args.isLinewise === undefined ? false : args.isLinewise;

        const stash = ActionRegister.GetStash();

        if (!stash) {
            return Promise.resolve(false);
        }

        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
            return Promise.resolve(false);
        }

        const document = activeTextEditor.document;

        let ranges = activeTextEditor.selections as readonly Range[];

        if (args.isLinewise) {
            ranges = ranges.map((range) => UtilRange.toLinewise(range, document));
        }

        return (
            args.shouldYank
                ? ActionRegister.yankSelections({
                      isLinewise: args.isLinewise!,
                  })
                : Promise.resolve(true)
        )
            .then(() =>
                activeTextEditor.edit((editBuilder) => {
                    ranges.forEach((selection) => {
                        editBuilder.replace(selection, stash.text);
                    });
                }),
            )
            .then(() => ActionSelection.shrinkToActives())
            .then(() => ActionReveal.primaryCursor());
    }

    @StaticReflect.metadata(SymbolMetadata.Action.isChange, true)
    static selectionsWithCharacter(args: { character: string }): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
            return Promise.resolve(false);
        }

        return activeTextEditor
            .edit((editBuilder) => {
                activeTextEditor.selections.forEach((selection) => {
                    let text = activeTextEditor.document.getText(selection);
                    editBuilder.replace(selection, text.replace(/[^\r\n]/g, args.character));
                });
            })
            .then(() => ActionReveal.primaryCursor());
    }

    @StaticReflect.metadata(SymbolMetadata.Action.isChange, true)
    static charactersWithCharacter(args: { character: string; n?: number }): Thenable<boolean> {
        args.n = args.n === undefined ? 1 : args.n;

        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
            return Promise.resolve(false);
        }

        let ranges = activeTextEditor.selections.map((selection) => {
            return new Range(selection.active, selection.active.translate(0, args.n));
        });

        ranges = UtilRange.unionOverlaps(ranges);

        return activeTextEditor
            .edit((editBuilder) => {
                ranges.forEach((range) => {
                    let text = activeTextEditor.document.getText(range);
                    editBuilder.replace(range, text.replace(/[^\r\n]/g, args.character));
                });
            })
            .then(() => ActionReveal.primaryCursor());
    }

    @StaticReflect.metadata(SymbolMetadata.Action.isChange, true)
    static textAtSelections(args: {
        text: string;
        replaceCharCnt?: number;
    }): Thenable<boolean | undefined> {
        if (args.replaceCharCnt !== undefined) {
            return ActionInsert.textAtSelections(args);
        }
        return ActionSelection.expandToOne().then(() => ActionInsert.textAtSelections(args));
    }
}
