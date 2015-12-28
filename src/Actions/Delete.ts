import {window, commands, Range} from 'vscode';
import {ActionReveal} from './Reveal';
import {Motion} from '../Motions/Motion';
import {UtilRange} from '../Utils/Range';

export class ActionDelete {

    static byMotions(args: {motions: Motion[]}): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        let ranges = activeTextEditor.selections.map(selection => {
            const start = selection.active;
            const end = args.motions.reduce((position, motion) => {
                return motion.apply(position, {inclusive: true});
            }, start);
            return new Range(start, end);
        });

        ranges = ranges.map(range => {
            return range.isSingleLine ? range : UtilRange.toLinewise(range);
        })

        ranges = UtilRange.unionOverlaps(ranges);

        // TODO: Move cursor to first non-space if needed

        return activeTextEditor.edit((editBuilder) => {
            ranges.forEach((range) => editBuilder.delete(range));
        })
            .then(ActionReveal.primaryCursor);
    }

    static selections(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        return activeTextEditor.edit((editBuilder) => {
            activeTextEditor.selections.forEach(selection => {
                if (! selection.isEmpty) {
                    editBuilder.delete(selection);
                }
            });
        })
            .then(ActionReveal.primaryCursor);
    }

    static selectionsOrLeft(): Thenable<boolean> {
        return commands.executeCommand('deleteLeft');
    }

    static selectionsOrRight(): Thenable<boolean> {
        return commands.executeCommand('deleteRight');
    }

    static line(): Thenable<boolean> {
        return commands.executeCommand('editor.action.deleteLines')
            .then(ActionReveal.primaryCursor);
    }

};
