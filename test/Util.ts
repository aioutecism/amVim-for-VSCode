import {workspace, window, Uri, TextDocument, Position, Selection} from 'vscode';

export function createTempDocument(content?: string): Thenable<boolean> {
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

export function getDocument(): TextDocument {
    return window.activeTextEditor.document;
}

export function setPosition(position: Position): void {
    setPositions([position]);
}

export function setPositions(positions: Position[]): void {
    window.activeTextEditor.selections = positions.map(position => {
        return new Selection(position, position);
    });
}

export function setSelection(selection: Selection): void {
    setSelections([selection]);
}

export function setSelections(selections: Selection[]): void {
    window.activeTextEditor.selections = selections;
}

export function getPosition(): Position {
    const activeEditor = window.activeTextEditor;

    if (activeEditor.selections.length > 1) {
        throw Error('Multiple selections detacted.');
    }
    if (!activeEditor.selection.isEmpty) {
        throw Error('Selection is not empty.');
    }

    return activeEditor.selection.active;
}

export function getPositions(): Position[] {
    const activeEditor = window.activeTextEditor;

    const positions: Position[] = [];

    for (let i = 0; i < activeEditor.selections.length; i++) {
        const selection = activeEditor.selections[i];

        if (!selection.isEmpty) {
            throw Error('Non-empty selection detacted.');
        }

        positions.push(selection.active);
    }

    return positions;
}

export function getSelection(): Selection {
    const activeEditor = window.activeTextEditor;

    if (activeEditor.selections.length > 1) {
        throw Error('Multiple selections detacted.');
    }

    return activeEditor.selection;
}

export function getSelections(): Selection[] {
    return window.activeTextEditor.selections;
}
