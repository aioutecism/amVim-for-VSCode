import {
    workspace,
    window,
    TextDocument,
    TextEditor,
    Position,
    Range,
    Selection,
    EndOfLine,
} from 'vscode';

export function createTempDocument(
    content?: string,
    reusableDocument?: TextDocument,
    language: string = 'plaintext',
): Thenable<TextEditor> {
    let getTextEditor: Thenable<TextEditor>;

    if (
        reusableDocument?.languageId === language &&
        window.activeTextEditor &&
        window.activeTextEditor.document === reusableDocument
    ) {
        getTextEditor = Promise.resolve(window.activeTextEditor);
    } else {
        // for non-plaintext files, sleep for a while to let the language server load
        const getDocument =
            reusableDocument?.languageId === language
                ? workspace.openTextDocument(reusableDocument.uri)
                : workspace.openTextDocument({ language }).then((document) =>
                      language === 'plaintext'
                          ? document
                          : new Promise<TextDocument>((resolve) => {
                                setTimeout(() => resolve(document), 1500);
                            }),
                  );
        getTextEditor = getDocument.then((document) => window.showTextDocument(document));
    }

    return getTextEditor.then((textEditor) => {
        if (content) {
            return textEditor
                .edit((editBuilder) => {
                    editBuilder.setEndOfLine(EndOfLine.LF);
                    editBuilder.replace(new Range(0, 0, textEditor.document.lineCount, 0), content);
                })
                .then(() => textEditor);
        }

        return textEditor;
    });
}

export function getDocument(): TextDocument | undefined {
    return window.activeTextEditor && window.activeTextEditor.document;
}

export function setPosition(position: Position): void {
    setPositions([position]);
}

export function setPositions(positions: Position[]): void {
    if (!window.activeTextEditor) {
        throw new Error('No active text editor.');
    }

    window.activeTextEditor.selections = positions.map((position) => {
        return new Selection(position, position);
    });
}

export function setSelection(selection: Selection): void {
    setSelections([selection]);
}

export function setSelections(selections: Selection[]): void {
    if (!window.activeTextEditor) {
        throw new Error('No active text editor.');
    }

    window.activeTextEditor.selections = selections;
}

export function getPosition(): Position {
    if (!window.activeTextEditor) {
        throw new Error('No active text editor.');
    }

    const activeEditor = window.activeTextEditor;

    if (activeEditor.selections.length > 1) {
        throw Error('Multiple selections detected.');
    }
    if (!activeEditor.selection.isEmpty) {
        throw Error('Selection is not empty.');
    }

    return activeEditor.selection.active;
}

export function getPositions(): Position[] {
    if (!window.activeTextEditor) {
        throw new Error('No active text editor.');
    }

    const activeEditor = window.activeTextEditor;

    const positions: Position[] = [];

    for (let i = 0; i < activeEditor.selections.length; i++) {
        const selection = activeEditor.selections[i];

        if (!selection.isEmpty) {
            throw Error('Non-empty selection detected.');
        }

        positions.push(selection.active);
    }

    return positions;
}

export function getSelection(): Selection {
    if (!window.activeTextEditor) {
        throw new Error('No active text editor.');
    }

    const activeEditor = window.activeTextEditor;

    if (activeEditor.selections.length > 1) {
        throw Error('Multiple selections detected.');
    }

    return activeEditor.selection;
}

export function getSelections(): Selection[] {
    if (!window.activeTextEditor) {
        throw new Error('No active text editor.');
    }

    return window.activeTextEditor.selections;
}
