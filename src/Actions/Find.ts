import { window, commands, Selection } from 'vscode';
import { ActionSelection } from './Selection';

export class ActionFind {
    static focusFindWidget(): Thenable<boolean | undefined> {
        return commands.executeCommand('actions.find');
    }

    static executeNativeFind(): Thenable<boolean> {
        return commands
            .executeCommand('workbench.action.focusActiveEditorGroup')
            .then(ActionSelection.shrinkToStarts);
    }

    static byIndicator(): Thenable<boolean | undefined> {
        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
            return Promise.resolve(false);
        }

        activeTextEditor.selection = new Selection(
            activeTextEditor.selection.active,
            activeTextEditor.selection.active,
        );

        return commands.executeCommand('editor.action.addSelectionToNextFindMatch');
    }

    static next(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
            return Promise.resolve(false);
        }

        // vim always searches from 1 to the right of the current cursor position
        return commands
            .executeCommand('cursorMove', {
                to: 'right',
            })
            .then(() => {
                const before = activeTextEditor.selection;

                return commands.executeCommand('editor.action.nextMatchFindAction').then(() => {
                    window.showTextDocument(activeTextEditor.document, activeTextEditor.viewColumn);
                    if (before === activeTextEditor.selection) {
                        // nothing got matched
                        return commands
                            .executeCommand('cursorMove', {
                                to: 'left',
                            })
                            .then(() => Promise.resolve(true));
                    }
                    return ActionSelection.shrinkToStarts();
                });
            });
    }

    static prev(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
            return Promise.resolve(false);
        }

        return commands.executeCommand('editor.action.previousMatchFindAction').then(() => {
            window.showTextDocument(activeTextEditor.document, activeTextEditor.viewColumn);
            activeTextEditor.selection = new Selection(
                activeTextEditor.selection.start,
                activeTextEditor.selection.start,
            );
            return Promise.resolve(true);
        });
    }
}
