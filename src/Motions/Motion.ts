import {window, Position} from 'vscode'

export class Motion {
	private _targetPosition: Position;
	get targetPosition() { return this._targetPosition; }

	protected relative(lineOffset: number, characterOffset: number): void {
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

		this._targetPosition = new Position(targetLine, targetCharacter);
	}
}