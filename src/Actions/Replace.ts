import {window, commands, Range} from 'vscode';
import {ActionReveal} from './Reveal';
import {Motion} from '../Motions/Motion';
import {UtilRange} from '../Utils/Range';

export class ActionReplace {

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
            .then(ActionReveal.primaryCursor);
    }

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
            .then(ActionReveal.primaryCursor);
    }

};
