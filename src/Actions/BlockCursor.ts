import {window, TextEditor, TextEditorCursorStyle} from 'vscode';

export class ActionBlockCursor {

    private static isOn = false;

    static on(): Thenable<boolean> {
        ActionBlockCursor.isOn = true;

        let opt = window.activeTextEditor.options;
        opt.cursorStyle = TextEditorCursorStyle.Block;
        window.activeTextEditor.options = opt;

        return Promise.resolve(true);
    }

    static off(): Thenable<boolean> {
        ActionBlockCursor.isOn = false;

        let opt = window.activeTextEditor.options;
        opt.cursorStyle = TextEditorCursorStyle.Line;
        window.activeTextEditor.options = opt;

        return Promise.resolve(true);
    }
}
