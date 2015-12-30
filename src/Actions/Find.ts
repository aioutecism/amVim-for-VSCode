import {window, commands, Selection} from 'vscode';

export class ActionFind {

    // TODO: Implement independent find function to avoid visual flashing.

    static next(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        return commands.executeCommand('editor.action.nextMatchFindAction')
            .then(() => {
                activeTextEditor.selection = new Selection(activeTextEditor.selection.start, activeTextEditor.selection.start);
                window.showTextDocument(activeTextEditor.document);
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
                activeTextEditor.selection = new Selection(activeTextEditor.selection.start, activeTextEditor.selection.start);
                window.showTextDocument(activeTextEditor.document);
                return Promise.resolve(true);
            });
    }

};
