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

export function setCursorPosition(position: Position) {
    const editor = window.activeTextEditor;
    editor.selection = new Selection(position, position);
}

export function getCursorPosition(): Position {
    const editor = window.activeTextEditor;
    return editor.selection.active;
}
