import {window, Selection} from 'vscode';

export class ActionSelection {

    static shrinkAStep(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        if (activeTextEditor.selections.length > 1) {
            activeTextEditor.selections = [activeTextEditor.selection];
        }
        else if (! activeTextEditor.selection.isEmpty) {
            return ActionSelection.shrinkToPrimaryActive();
        }
        else {
            return Promise.resolve(false);
        }

        return Promise.resolve(true);
    }

    static shrinkToPrimaryActive(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        let position = activeTextEditor.selection.active;

        if (! activeTextEditor.selection.isReversed && position.character > 0) {
            position = position.translate(0, -1);
        }

        activeTextEditor.selection = new Selection(position, position);

        return Promise.resolve(true);
    }

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

    static expandToOne(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        activeTextEditor.selections = activeTextEditor.selections.map(selection => {
            return selection.isEmpty
                ? new Selection(selection.anchor, selection.anchor.translate(0, +1))
                : selection;
        });

        return Promise.resolve(true);
    }

    static expandToLine(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        activeTextEditor.selections = activeTextEditor.selections.map(selection => {
            return new Selection(
                selection.start.with(undefined, 0),
                selection.end.with(undefined, activeTextEditor.document.lineAt(selection.end.line).text.length)
            );
        });

        return Promise.resolve(true);
    }

};
