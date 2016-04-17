import {window, commands, Position, Selection, TextDocument} from 'vscode';
import {PrototypeReflect} from '../LanguageExtensions/PrototypeReflect';
import {SymbolMetadata} from '../Symbols/Metadata';
import {ActionReveal} from './Reveal';
import {ActionMoveCursor} from './MoveCursor';
import {MotionCharacter} from '../Motions/Character';
import {MotionLine} from '../Motions/Line';

export class ActionInsert {

    @PrototypeReflect.metadata(SymbolMetadata.Action.isChange, true)
    static characterAtSelections(args: {character: string}): Thenable<boolean> {
        return commands.executeCommand('default:type', { text: args.character });
    }

    @PrototypeReflect.metadata(SymbolMetadata.Action.isChange, true)
    static newLineBefore(): Thenable<boolean> {
        return commands.executeCommand('editor.action.insertLineBefore');
    }

    @PrototypeReflect.metadata(SymbolMetadata.Action.isChange, true)
    static newLineAfter(): Thenable<boolean> {
        return commands.executeCommand('editor.action.insertLineAfter');
    }

}
