import {window, TextEditor, TextEditorCursorStyle} from 'vscode';

export class ActionBlockCursor {

    static on(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        let opt = window.activeTextEditor.options;
        opt.cursorStyle = TextEditorCursorStyle.Block;
        window.activeTextEditor.options = opt;

        return Promise.resolve(true);
    }

    static off(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        let opt = window.activeTextEditor.options;
        opt.cursorStyle = TextEditorCursorStyle.Line;
        window.activeTextEditor.options = opt;

        return Promise.resolve(true);
    }
}
