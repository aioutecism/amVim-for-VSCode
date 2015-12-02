import {window, TextEditor, Position, Range, Selection} from 'vscode';

function characterRelative(lineOffset: number, characterOffset: number): void {
	const activeTextEditor = window.activeTextEditor;

	if (! activeTextEditor) {
		return;
	}

	const document = activeTextEditor.document;

	const currentPosition = activeTextEditor.selection.start;
	const currentLineLength = document.lineAt(currentPosition.line).text.length;

	let targetLine = currentPosition.line + lineOffset;
	let targetCharacter = currentPosition.character + characterOffset;

	targetLine = Math.max(targetLine, 0);
	targetLine = Math.min(targetLine, document.lineCount - 1);

	targetCharacter = Math.max(targetCharacter, 0);
	targetCharacter = Math.min(targetCharacter, currentLineLength);

	const targetPosition = new Position(targetLine, targetCharacter);
	window.activeTextEditor.selection = new Selection(targetPosition, targetPosition);
}

export function characterLeft(): void {
	characterRelative(0, -1);
}
export function characterRight(): void {
	characterRelative(0, +1);
}
export function characterTop(): void {
	characterRelative(-1, 0);
}
export function characterBottom(): void {
	characterRelative(+1, 0);
}