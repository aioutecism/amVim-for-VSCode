import {commands, window} from 'vscode';
import {Motion} from '../Motions/Motion';
import {ActionMoveCursor} from './MoveCursor';
import {ActionSelection} from './Selection';
import {ActionReveal} from './Reveal';

class Format {

    static bySelections(): Thenable<boolean | undefined> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        if (activeTextEditor.selections.length === 0
        || activeTextEditor.selections.every((selection) => selection.isEmpty)
        ) {
            return Promise.resolve(false);
        }

        return commands.executeCommand('editor.action.formatSelection');
    }

    static byCursors(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        const originalSelections = activeTextEditor.selections;

        return ActionSelection.expandToLine()
        .then(() => {
            return commands.executeCommand('editor.action.formatSelection');
        })
        .then(() => {
            activeTextEditor.selections = originalSelections;
            return Promise.resolve(true);
        })
        .then(() => ActionReveal.primaryCursor());
    }

    static byMotions(args: {
        motions: Motion[]
    }): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        const originalSelections = activeTextEditor.selections;

        return ActionMoveCursor.byMotions({
            motions: args.motions,
            isVisualLineMode: true,
        })
        .then(() => {
            return commands.executeCommand('editor.action.formatSelection');
        })
        .then(() => {
            activeTextEditor.selections = originalSelections;
            return Promise.resolve(true);
        })
        .then(() => ActionReveal.primaryCursor());
    }

}


export const ActionFilter = {
    Format: Format
};
