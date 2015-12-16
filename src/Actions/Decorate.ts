import {window, Selection, Range, TextEditor, TextEditorDecorationType} from 'vscode';

export class ActionDecorate {

    private static decoration = window.createTextEditorDecorationType({
        backgroundColor: 'rgba(128, 128, 128, 0.7)'
    });

    static activeCursors(textEditor: TextEditor, selections: Selection[]): Thenable<boolean> {
        const ranges = selections.map(selection => {
            return new Range(selection.active, selection.active.translate(0, 1));
        });

        textEditor.setDecorations(ActionDecorate.decoration, ranges);

        return Promise.resolve(true);
    }

    static seletions(textEditor: TextEditor, selections: Selection[]): Thenable<boolean> {
        textEditor.setDecorations(ActionDecorate.decoration, selections);

        return Promise.resolve(true);
    }

}
