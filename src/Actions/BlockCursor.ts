import {window, TextEditorCursorStyle} from 'vscode';

export class ActionBlockCursor {

    static on(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        // Workaround for VSCode API's bug: https://github.com/Microsoft/vscode/issues/17513
        // TODO: Remove next line when the bug is fixed.
        activeTextEditor.options.cursorStyle = TextEditorCursorStyle.Line;
        activeTextEditor.options.cursorStyle = TextEditorCursorStyle.Block;

        return Promise.resolve(true);
    }

    static off(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        // Workaround for VSCode API's bug: https://github.com/Microsoft/vscode/issues/17513
        // TODO: Remove next line when the bug is fixed.
        activeTextEditor.options.cursorStyle = TextEditorCursorStyle.Block;
        activeTextEditor.options.cursorStyle = TextEditorCursorStyle.Line;

        return Promise.resolve(true);
    }

}
