import {window, Range} from 'vscode';
import {PrototypeReflect} from '../LanguageExtensions/PrototypeReflect';
import {SymbolMetadata} from '../Symbols/Metadata';
import {ActionReveal} from './Reveal';
import {UtilRange} from '../Utils/Range';

export class ActionReplace {

    @PrototypeReflect.metadata(SymbolMetadata.Action.isChange, true)
    static selections(args: {character: string}): Thenable<boolean> {
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

    @PrototypeReflect.metadata(SymbolMetadata.Action.isChange, true)
    static characters(args: {character: string, n?: number}): Thenable<boolean> {
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
