import {window, Range} from 'vscode';
import {PrototypeReflect} from '../LanguageExtensions/PrototypeReflect';
import {SymbolMetadata} from '../Symbols/Metadata';
import {ActionReveal} from './Reveal';
import {UtilRange} from '../Utils/Range';
import {UtilCharacter} from '../Utils/Character';

export class ActionCase {

    @PrototypeReflect.metadata(SymbolMetadata.Action.isChange, true)
    static switchSelections(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        return activeTextEditor.edit((editBuilder) => {
            activeTextEditor.selections.forEach(selection => {
                const text = activeTextEditor.document.getText(selection);
                editBuilder.replace(selection, UtilCharacter.switchCase(text));
            });
        })
            .then(() => ActionReveal.primaryCursor());
    }

    @PrototypeReflect.metadata(SymbolMetadata.Action.isChange, true)
    static switchActives(args: {n?: number}): Thenable<boolean> {
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
                const text = activeTextEditor.document.getText(range);
                editBuilder.replace(range, UtilCharacter.switchCase(text));
            });
        })
            .then(() => ActionReveal.primaryCursor());
    }

};
