import {window, Selection, Position} from 'vscode';

export class Motion {
	private lineDelta = 0;
	private characterDelta = 0;

	protected translate(lineDelta: number, characterDelta: number): void {
		this.lineDelta = lineDelta;
		this.characterDelta = characterDelta;
	}

	apply(from: Selection): Selection {
		const activeTextEditor = window.activeTextEditor;

		if (! activeTextEditor) {
			return from;
		}

		const document = activeTextEditor.document;

		let toLine = from.active.line + this.lineDelta;
		let toCharacter = from.active.character + this.characterDelta;

		toLine = Math.max(toLine, 0);
		toLine = Math.min(toLine, document.lineCount - 1);

		toCharacter = Math.max(toCharacter, 0);
		toCharacter = Math.min(toCharacter, document.lineAt(toLine).text.length);

		const toPosition = new Position(toLine, toCharacter);

		if (from.isEmpty) {
			return new Selection(toPosition, toPosition);
		}
		else {
			return new Selection(from.anchor, toPosition);
		}
	}
}