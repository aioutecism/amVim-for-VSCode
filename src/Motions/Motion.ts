import {window, Selection, Position} from 'vscode';

export enum MotionWordPosition {NEXT_START, NEXT_END, PREV_START};

export class Motion {

	private lineDelta = 0;
	private characterDelta = 0;
	private wordDelta: MotionWordPosition;

	private wordSeparators = './\\\\()"\'\\-:,.;<>~!@#$%^&*|+=\\[\\]{}`~?';

	protected translate(lineDelta: number, characterDelta: number, wordDelta?: MotionWordPosition): void {
		this.lineDelta += lineDelta;
		this.characterDelta += characterDelta;
		this.wordDelta = wordDelta;
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

		if (this.wordDelta !== undefined) {
			let targetText = document.lineAt(toLine).text;

			if (this.wordDelta === MotionWordPosition.NEXT_START) {
				targetText = targetText.substr(toCharacter);

				const matches = targetText.match(new RegExp(
					`^(\\s+)?((?:[${this.wordSeparators}]+|[^\\s${this.wordSeparators}]+)\\s*)?`
				));
				toCharacter += matches[1] ? matches[1].length : matches[2] ? matches[2].length : matches[0].length;
			}
			else if (this.wordDelta === MotionWordPosition.NEXT_END) {
				targetText = targetText.substr(toCharacter);

				const matches = targetText.match(new RegExp(
					`^(\\s+)?((?:[${this.wordSeparators}]+|[^\\s${this.wordSeparators}]+))?`
				));
				toCharacter += matches[0].length;
			}
			else if (this.wordDelta === MotionWordPosition.PREV_START) {
				targetText = targetText
					.substr(0, toCharacter)
					.split('').reverse().join('');

				const matches = targetText.match(new RegExp(
					`^(\\s+)?((?:[${this.wordSeparators}]+|[^\\s${this.wordSeparators}]+))?`
				));
				toCharacter -= matches[0].length;
			}
		}

		toCharacter += this.characterDelta;

		toCharacter = Math.max(toCharacter, 0);
		toCharacter = Math.min(toCharacter, document.lineAt(toLine).text.length);

		const activePosition = new Position(toLine, toCharacter);
		const anchorPosition = from.isEmpty ? activePosition : from.anchor;

		return new Selection(anchorPosition, activePosition);
	}

}