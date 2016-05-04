import {workspace, window, Uri, Position} from 'vscode';

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
