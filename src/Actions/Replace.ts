import {window, Range} from 'vscode';
import {StaticReflect} from '../LanguageExtensions/StaticReflect';
import {SymbolMetadata} from '../Symbols/Metadata';
import {ActionRegister} from './Register';
import {ActionSelection} from './Selection';
import {ActionReveal} from './Reveal';
import {UtilRange} from '../Utils/Range';

export class ActionReplace {

    @StaticReflect.metadata(SymbolMetadata.Action.isChange, true)
    static selectionsWithRegister(args: {
        shouldYank?: boolean
    }): Thenable<boolean> {
        args.shouldYank = args.shouldYank === undefined ? false : args.shouldYank;

        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        const document = activeTextEditor.document;
        const originalTexts: string[] = [];

        return activeTextEditor.edit((editBuilder) => {
            activeTextEditor.selections.forEach(selection => {
                originalTexts.push(document.getText(selection));
                editBuilder.replace(selection, ActionRegister.GetStash());
            });
        })
            .then(() => {
                ActionRegister.SetStash(originalTexts);
            })
            .then(() => ActionSelection.shrinkToActives())
            .then(() => ActionReveal.primaryCursor());
    }

    @StaticReflect.metadata(SymbolMetadata.Action.isChange, true)
    static selectionsWithCharacter(args: {character: string}): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        return activeTextEditor.edit((editBuilder) => {
            activeTextEditor.selections.forEach(selection => {
                let text = activeTextEditor.document.getText(selection);
                editBuilder.replace(selection, text.replace(/[^\n]/g, args.character));
            });
        })
            .then(() => ActionReveal.primaryCursor());
    }

    @StaticReflect.metadata(SymbolMetadata.Action.isChange, true)
    static charactersWithCharacter(args: {character: string, n?: number}): Thenable<boolean> {
        args.n = args.n === undefined ? 1 : args.n;

        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        let ranges = activeTextEditor.selections.map(selection => {
            return new Range(selection.active, selection.active.translate(0, args.n));
        });

        ranges = UtilRange.unionOverlaps(ranges);

        return activeTextEditor.edit((editBuilder) => {
            ranges.forEach(range => {
                let text = activeTextEditor.document.getText(range);
                editBuilder.replace(range, text.replace(/[^\n]/g, args.character));
            });
        })
            .then(() => ActionReveal.primaryCursor());
    }

};
