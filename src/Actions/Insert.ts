import {commands} from 'vscode';
import {PrototypeReflect} from '../LanguageExtensions/PrototypeReflect';
import {SymbolMetadata} from '../Symbols/Metadata';

export class ActionInsert {

    @PrototypeReflect.metadata(SymbolMetadata.Action.isChange, true)
    static characterAtSelections(args: { character: string, replaceCharCnt?: number }): Thenable<boolean> {
        if (args.replaceCharCnt !== undefined) {
            return commands.executeCommand('default:replacePreviousChar', {
                text: args.character,
                replaceCharCnt: args.replaceCharCnt,
            });
        }
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
