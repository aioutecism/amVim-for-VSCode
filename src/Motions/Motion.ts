import {window, Selection, Position} from 'vscode';

export class Motion {

	private lineDelta = 0;
	private characterDelta = 0;

	protected translate(lineDelta: number, characterDelta: number): void {
		this.lineDelta += lineDelta;
		this.characterDelta += characterDelta;
	}

	apply(from: Selection): Selection {
		const activeTextEditor = window.activeTextEditor;

		if (! activeTextEditor) {
			return from;
		}

		const document = activeTextEditor.document;

		// Count tab as editor.tabSize

		let toLine = from.active.line;
		toLine += this.lineDelta;
		toLine = Math.max(toLine, 0);
		toLine = Math.min(toLine, document.lineCount - 1);

		let toCharacter = from.active.character;
		toCharacter += this.characterDelta;
		toCharacter = Math.max(toCharacter, 0);
		toCharacter = Math.min(toCharacter, document.lineAt(toLine).text.length);

		const activePosition = new Position(toLine, toCharacter);
		const anchorPosition = from.isEmpty ? activePosition : from.anchor;

		return new Selection(anchorPosition, activePosition);
	}

}