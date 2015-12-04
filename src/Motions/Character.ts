import {window, TextEditor, Position, Range, Selection} from 'vscode';
import {Motion} from './Motion'

export class MotionCharacter extends Motion {
	private relative(lineOffset: number, characterOffset: number): void {
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

	left(): void {
		this.relative(0, -1);
	}
	right(): void {
		this.relative(0, +1);
	}
	up(): void {
		this.relative(-1, 0);
	}
	down(): void {
		this.relative(+1, 0);
	}
}
