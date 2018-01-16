import {commands} from 'vscode';
import {StaticReflect} from '../LanguageExtensions/StaticReflect';
import {SymbolMetadata} from '../Symbols/Metadata';

export class ActionInsert {

    @StaticReflect.metadata(SymbolMetadata.Action.isChange, true)
    static textAtSelections(args: { text: string, replaceCharCnt?: number }): Thenable<boolean | undefined> {
        if (args.replaceCharCnt !== undefined) {
            return commands.executeCommand('default:replacePreviousChar', {
                text: args.text,
                replaceCharCnt: args.replaceCharCnt,
            });
        }
        return commands.executeCommand('default:type', { text: args.text });
    }

    @StaticReflect.metadata(SymbolMetadata.Action.isChange, true)
    static newLineBefore(): Thenable<boolean | undefined> {
        return commands.executeCommand('editor.action.insertLineBefore');
    }

    @StaticReflect.metadata(SymbolMetadata.Action.isChange, true)
    static newLineAfter(): Thenable<boolean | undefined> {
        return commands.executeCommand('editor.action.insertLineAfter');
    }

}
