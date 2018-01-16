import {window, commands, Selection} from 'vscode';

export class ActionFind {

    static focusFindWidget(): Thenable<boolean | undefined> {
        return commands.executeCommand('actions.find');
    }

    // TODO: Implement independent find function to avoid incorrect cursor position after `next()`

    static byIndicator(): Thenable<boolean | undefined> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        activeTextEditor.selection = new Selection(activeTextEditor.selection.active, activeTextEditor.selection.active);

        return commands.executeCommand('editor.action.addSelectionToNextFindMatch');
    }

    static next(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        return commands.executeCommand('editor.action.nextMatchFindAction')
            .then(() => {
                window.showTextDocument(activeTextEditor.document, activeTextEditor.viewColumn);
                activeTextEditor.selection = new Selection(activeTextEditor.selection.end, activeTextEditor.selection.end);
                return Promise.resolve(true);
            });
    }

    static prev(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        return commands.executeCommand('editor.action.previousMatchFindAction')
            .then(() => {
                window.showTextDocument(activeTextEditor.document, activeTextEditor.viewColumn);
                activeTextEditor.selection = new Selection(activeTextEditor.selection.start, activeTextEditor.selection.start);
                return Promise.resolve(true);
            });
    }

}
