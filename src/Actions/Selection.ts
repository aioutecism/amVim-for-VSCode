import {window, Selection} from 'vscode';
import {getCurrentMode} from '../extension';
import {ModeID} from '../Modes/Mode';
import {TextObject} from '../TextObjects/TextObject';
import {UtilSelection} from '../Utils/Selection';

export class ActionSelection {

    static validateSelections(): Thenable<boolean> {
        const currentMode = getCurrentMode();
        if (currentMode !== null && currentMode.id === ModeID.INSERT) {
            return Promise.resolve(true);
        }

        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        const document = activeTextEditor.document;

        let isChanged = false;

        const validatedSelections = activeTextEditor.selections.map(selection => {
            if (! selection.isEmpty) {
                return selection;
            }

            const position = selection.active;
            const endCharacter = document.lineAt(position).range.end.character;
            const maxCharacter = endCharacter > 0 ? endCharacter - 1 : endCharacter;

            if (position.character > maxCharacter) {
                isChanged = true;
                return new Selection(
                    position.line, maxCharacter,
                    position.line, maxCharacter);
            }
            else {
                return selection;
            }
        });

        if (isChanged) {
            activeTextEditor.selections = validatedSelections;
        }

        return Promise.resolve(true);
    }

    static shrinkToPrimaryActive(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        activeTextEditor.selection = UtilSelection.shrinkToActive(activeTextEditor.selection);

        return Promise.resolve(true);
    }

    static shrinkToActives(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        if (activeTextEditor.selections.every(selection => selection.isEmpty)) {
            return Promise.resolve(false);
        }

        activeTextEditor.selections = UtilSelection.shrinkToActives(activeTextEditor.selections);

        return Promise.resolve(true);
    }

    static shrinkToStarts(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        activeTextEditor.selections = activeTextEditor.selections.map(selection => {
            return new Selection(selection.start, selection.start);
        });

        return Promise.resolve(true);
    }

    static shrinkToEnds(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        activeTextEditor.selections = activeTextEditor.selections.map(selection => {
            return new Selection(selection.end, selection.end);
        });

        return Promise.resolve(true);
    }

    static expandToOne(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        activeTextEditor.selections = activeTextEditor.selections.map(selection => {
            return selection.isEmpty
                ? new Selection(selection.anchor, selection.anchor.translate(0, +1))
                : selection;
        });

        return Promise.resolve(true);
    }

    static expandByTextObject(args: {
        textObject: TextObject
    }): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        let selections: Selection[] = [];

        activeTextEditor.selections.forEach(selection => {
            const positionToApply = selection.isReversed && selection.active.character > 0
                ? selection.active.translate(0, -1)
                : selection.active;
            const match = args.textObject.apply(positionToApply);
            if (match) {
                const range = selection.union(match);
                selection = selection.isReversed
                    ? new Selection(range.end, range.start)
                    : new Selection(range.start, range.end);
            }
            selections.push(selection);
        });

        if (selections.length === 0) {
            return Promise.reject<boolean>(false);
        }

        selections = UtilSelection.unionOverlaps(selections);
        activeTextEditor.selections = selections;

        return Promise.resolve(true);
    }

    static expandToLine(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        activeTextEditor.selections = activeTextEditor.selections.map(selection => {
            const start = selection.start.with(undefined, 0);
            const end = selection.end.with(undefined, activeTextEditor.document.lineAt(selection.end.line).text.length);
            return selection.isReversed
                ? new Selection(end, start)
                : new Selection(start, end);
        });

        return Promise.resolve(true);
    }

}
