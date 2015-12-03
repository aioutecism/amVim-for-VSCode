import {window, TextEditor, Position, Range, Selection} from 'vscode';

function relative(lineOffset: number, characterOffset: number): void {
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

export function left(): void {
	relative(0, -1);
}
export function right(): void {
	relative(0, +1);
}
export function up(): void {
	relative(-1, 0);
}
export function down(): void {
	relative(+1, 0);
}