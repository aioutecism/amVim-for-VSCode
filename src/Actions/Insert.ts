import {commands} from 'vscode';
import {StaticReflect} from '../LanguageExtensions/StaticReflect';
import {SymbolMetadata} from '../Symbols/Metadata';

export class ActionInsert {

    @StaticReflect.metadata(SymbolMetadata.Action.isChange, true)
    static characterAtSelections(args: { character: string, replaceCharCnt?: number }): Thenable<boolean> {
        if (args.replaceCharCnt !== undefined) {
            return commands.executeCommand('default:replacePreviousChar', {
                text: args.character,
                replaceCharCnt: args.replaceCharCnt,
            });
        }
        return commands.executeCommand('default:type', { text: args.character });
    }

    @StaticReflect.metadata(SymbolMetadata.Action.isChange, true)
    static newLineBefore(): Thenable<boolean> {
        return commands.executeCommand('editor.action.insertLineBefore');
    }

    @StaticReflect.metadata(SymbolMetadata.Action.isChange, true)
    static newLineAfter(): Thenable<boolean> {
        return commands.executeCommand('editor.action.insertLineAfter');
    }

}
