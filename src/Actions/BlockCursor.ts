import {window, TextEditorCursorStyle} from 'vscode';

export class ActionBlockCursor {

    static on(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        let opt = activeTextEditor.options;
        opt.cursorStyle = TextEditorCursorStyle.Block;
        activeTextEditor.options = opt;

        return Promise.resolve(true);
    }

    static off(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        let opt = activeTextEditor.options;
        opt.cursorStyle = TextEditorCursorStyle.Line;
        activeTextEditor.options = opt;

        return Promise.resolve(true);
    }

}
