import {window, Selection} from 'vscode';

export class ActionSelection {

    static shrinkToActives(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        activeTextEditor.selections = activeTextEditor.selections.map(selection => {
            return new Selection(selection.active, selection.active);
        });

        return Promise.resolve(true);
    }

    static shrinkToStarts(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        activeTextEditor.selections = activeTextEditor.selections.map(selection => {
            return new Selection(selection.start, selection.start);
        });

        return Promise.resolve(true);
    }

    static shrinkToEnds(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        activeTextEditor.selections = activeTextEditor.selections.map(selection => {
            return new Selection(selection.end, selection.end);
        });

        return Promise.resolve(true);
    }

};
