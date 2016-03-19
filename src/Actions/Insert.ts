import {window, commands, Position, Selection, TextDocument} from 'vscode';
import {ActionReveal} from './Reveal';
import {ActionMoveCursor} from './MoveCursor';
import {MotionCharacter} from '../Motions/Character';
import {MotionLine} from '../Motions/Line';

export class ActionInsert {

    static characterAtSelections(args: {character: string}): Thenable<boolean> {
        return commands.executeCommand('default:type', { text: args.character });
    }

    static newLineBefore(): Thenable<boolean> {
        return commands.executeCommand('editor.action.insertLineBefore');
    }

    static newLineAfter(): Thenable<boolean> {
        return commands.executeCommand('editor.action.insertLineAfter');
    }

}
