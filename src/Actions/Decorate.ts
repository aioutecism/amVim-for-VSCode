import {window, Selection, Range, TextEditor, TextEditorDecorationType} from 'vscode';

export class ActionDecorate {

    private static decoration = window.createTextEditorDecorationType({
        backgroundColor: 'rgba(128, 128, 128, 0.7)',
        borderRadius: '2px',
    });

    static activeCursors(textEditor: TextEditor, selections: Selection[]): Thenable<boolean> {
        const ranges = selections.map(selection => {
            return new Range(selection.active, selection.active.translate(0, +1));
        });

        textEditor.setDecorations(ActionDecorate.decoration, ranges);

        return Promise.resolve(true);
    }

    static remove(textEditor: TextEditor): Thenable<boolean> {
        textEditor.setDecorations(ActionDecorate.decoration, []);

        return Promise.resolve(true);
    }

}
