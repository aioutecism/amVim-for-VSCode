import {window, Selection} from 'vscode';

export class ActionInsert {
	static characterAtSelections(character: string): void {
		const activeTextEditor = window.activeTextEditor;

		if (! activeTextEditor) {
			return;
		}

		let selections = activeTextEditor.selections;

		// TODO: Buggy on fast input
		activeTextEditor.edit((editBuilder) => {
			let fakeSelections: Selection[] = [];

			selections.forEach(selection => {
				let fakePosition = selection.start;

				if (selection.isEmpty) {
					editBuilder.insert(selection.active, character);
				}
				else {
					editBuilder.replace(selection, character);
					fakePosition = fakePosition.translate(0, 1);
				}

				fakeSelections.push(new Selection(fakePosition, fakePosition));
			});

			// This is executed before changes are applied
			activeTextEditor.selections = fakeSelections;
		});
	}
}