import {window, TextEditorCursorStyle} from 'vscode';

export class ActionBlockCursor {

    static on(): Thenable<boolean> {
        return new Promise((resovle) => {
            setTimeout(() => {
                const activeTextEditor = window.activeTextEditor;

                if (! activeTextEditor) {
                    return Promise.resolve(false);
                }

                // Workaround for VSCode API's bug: https://github.com/Microsoft/vscode/issues/17513
                // TODO: Remove next line when the bug is fixed.
                activeTextEditor.options.cursorStyle = TextEditorCursorStyle.Line;
                activeTextEditor.options.cursorStyle = TextEditorCursorStyle.Block;

                resovle(true);
            }, 0);
        });
    }

    static off(): Thenable<boolean> {
        return new Promise((resovle) => {
            setTimeout(() => {
                const activeTextEditor = window.activeTextEditor;

                if (! activeTextEditor) {
                    return Promise.resolve(false);
                }

                // Workaround for VSCode API's bug: https://github.com/Microsoft/vscode/issues/17513
                // TODO: Remove next line when the bug is fixed.
                activeTextEditor.options.cursorStyle = TextEditorCursorStyle.Underline;
                activeTextEditor.options.cursorStyle = TextEditorCursorStyle.Line;

                resovle(true);
            }, 0);
        });
    }

}
