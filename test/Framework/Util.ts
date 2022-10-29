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

export async function createTempDocument(
    content?: string,
    reusableDocument?: TextDocument,
    language: string = 'plaintext',
): Promise<TextEditor> {
    let textEditor: TextEditor;

    if (
        reusableDocument?.languageId === language &&
        window.activeTextEditor &&
        window.activeTextEditor.document === reusableDocument
    ) {
        textEditor = window.activeTextEditor;
    } else {
        let document: TextDocument;
        if (reusableDocument?.languageId === language) {
            document = await workspace.openTextDocument(reusableDocument.uri);
        } else {
            document = await workspace.openTextDocument({ language });
            // for non-plaintext files, sleep for a while to let the language server load
            if (language !== 'plaintext') {
                await new Promise((resolve) => setTimeout(resolve, 2000));
            }
        }
        textEditor = await window.showTextDocument(document);
    }

    if (content) {
        await textEditor.edit((editBuilder) => {
            editBuilder.setEndOfLine(EndOfLine.LF);
            editBuilder.replace(new Range(0, 0, textEditor.document.lineCount, 0), content);
        });
    }

    return textEditor;
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

export function setSelections(selections: readonly Selection[]): void {
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

export function getSelections(): readonly Selection[] {
    if (!window.activeTextEditor) {
        throw new Error('No active text editor.');
    }

    return window.activeTextEditor.selections;
}
