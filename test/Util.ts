import {workspace, window, Uri, Position, Range, Selection} from 'vscode';

export function createTempDocument(content?: string) {

    const uri = Uri.parse(`untitled:${__dirname}.${Math.random()}.tmp`);

    return workspace.openTextDocument(uri)
        .then(document => {
            return window.showTextDocument(document);
        })
        .then(() => {
            if (content) {
                return window.activeTextEditor.edit(editBuilder => {
                    editBuilder.insert(new Position(0, 0), content);
                });
            }
        });

}

export function setText(text: string) {
    let editor = window.activeTextEditor;

    return editor.edit(builder => {
        const document = editor.document;
        const lastLine = document.lineAt(document.lineCount - 1);

        const start = new Position(0, 0);
        const end = new Position(document.lineCount - 1, lastLine.text.length);

        builder.replace(new Range(start, end), text);
    });
}

export function setCursorScreenPosition(position: Position) {
    const editor = window.activeTextEditor;
    editor.selection = new Selection(position, position);
}

export function getCursorScreenPosition(): Position {
    const editor = window.activeTextEditor;
    return editor.selection.active;
}
