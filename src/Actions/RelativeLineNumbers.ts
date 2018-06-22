import { TextEditorLineNumbersStyle, window } from 'vscode';

export class ActionRelativeLineNumbers {

    static on(): Thenable<boolean> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const activeTextEditor = window.activeTextEditor;

                if (! activeTextEditor) {
                    return Promise.resolve(false);
                }

                const lineNumbersTurnedOff = activeTextEditor.options.lineNumbers === TextEditorLineNumbersStyle.Off

                if (lineNumbersTurnedOff) {
                    return Promise.resolve(false)
                }

                activeTextEditor.options.lineNumbers = TextEditorLineNumbersStyle.Relative;

                resolve(true);
            }, 0);
        });
    }

    static off(): Thenable<boolean> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const activeTextEditor = window.activeTextEditor;

                if (! activeTextEditor) {
                    return Promise.resolve(false);
                }

                const lineNumbersTurnedOff = activeTextEditor.options.lineNumbers === TextEditorLineNumbersStyle.Off

                if (lineNumbersTurnedOff) {
                    return Promise.resolve(false)
                }

                activeTextEditor.options.lineNumbers = TextEditorLineNumbersStyle.On;

                resolve(true);
            }, 0);
        });
    }

}
