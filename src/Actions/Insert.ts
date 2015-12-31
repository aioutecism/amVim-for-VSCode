import {window, commands, Position, Selection, TextDocument} from 'vscode';
import {ActionReveal} from './Reveal';
import {ActionMoveCursor} from './MoveCursor';
import {MotionCharacter} from '../Motions/Character';
import {MotionLine} from '../Motions/Line';

export class ActionInsert {

    static tabAtSelections(): Thenable<boolean> {
        return commands.executeCommand('tab');
    }

    static lineBreakAtSelections(): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        return commands.executeCommand('lineBreakInsert')
            .then(() => ActionMoveCursor.byMotions({
                motions: [
                    MotionCharacter.down(),
                    MotionLine.firstNonBlank(),
                ]
            }));
    }

    static characterAtSelections(args: {character: string}): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        return activeTextEditor.edit((editBuilder) => {
            let fakeSelections: Selection[] = [];

            activeTextEditor.selections.forEach(selection => {
                let fakePosition = selection.start;

                if (selection.isEmpty) {
                    editBuilder.insert(selection.active, args.character);
                }
                else {
                    editBuilder.replace(selection, args.character);
                    fakePosition = fakePosition.translate(0, +1);
                }

                fakeSelections.push(new Selection(fakePosition, fakePosition));
            });

            // This is executed before changes are applied
            activeTextEditor.selections = fakeSelections;
        })
            .then(ActionReveal.primaryCursor);
    }

    static newLineBefore(): Thenable<boolean> {
        return commands.executeCommand('editor.action.insertLineBefore');
    }

    static newLineAfter(): Thenable<boolean> {
        return commands.executeCommand('editor.action.insertLineAfter');
    }

}
