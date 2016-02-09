import {window, Range, TextEditorRevealType} from 'vscode';

export class ActionReveal {

    static primaryCursor(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        const activePosition = activeTextEditor.selection.active;
        activeTextEditor.revealRange(
            new Range(activePosition, activePosition), TextEditorRevealType.Default
        );

        return Promise.resolve(true);
    }

}
