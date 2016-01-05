import {window, Disposable, Selection, Range, TextEditor} from 'vscode';

export class ActionBlockCursor {

    private static decoration = window.createTextEditorDecorationType({
        borderStyle: 'solid',
        borderWidth: '0 0 0 1ch',
        borderColor: 'rgba(128, 128, 128, 0.7)',
        borderRadius: '2px',
    });

    private static isOn = false;
    private static disposables: Disposable[] = [];

    static on(): Thenable<boolean> {
        ActionBlockCursor.isOn = true;

        ActionBlockCursor.disposables.push(window.onDidChangeTextEditorSelection(e => {
            ActionBlockCursor.handler(e.textEditor, e.selections);
        }));

        const activeTextEditor = window.activeTextEditor;
        if (activeTextEditor) {
            return ActionBlockCursor.handler(activeTextEditor, activeTextEditor.selections);
        }

        return Promise.resolve(true);
    }

    static off(): Thenable<boolean> {
        ActionBlockCursor.isOn = false;

        Disposable.from(...ActionBlockCursor.disposables).dispose();

        const activeTextEditor = window.activeTextEditor;
        if (activeTextEditor) {
            activeTextEditor.setDecorations(ActionBlockCursor.decoration, []);
        }

        return Promise.resolve(true);
    }

    private static handler(textEditor: TextEditor, selections: Selection[]): Thenable<boolean> {
        if (! ActionBlockCursor.isOn) {
            return Promise.resolve(false);
        }

        const ranges = selections.map(selection => {
            return new Range(selection.active, selection.active.translate(0, +1));
        });

        textEditor.setDecorations(ActionBlockCursor.decoration, ranges);

        return Promise.resolve(true);
    }

}
