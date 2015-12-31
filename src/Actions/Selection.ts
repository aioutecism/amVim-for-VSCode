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

        if (! activeTextEditor.selection.isReversed) {
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

    static expandEmptiesToOne(): Thenable<boolean> {
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

};
