import {commands} from 'vscode';
import {PrototypeReflect} from '../LanguageExtensions/PrototypeReflect';
import {SymbolMetadata} from '../Symbols/Metadata';

export class ActionIndent {

    @PrototypeReflect.metadata(SymbolMetadata.Action.isChange, true)
    static increase(): Thenable<boolean> {
        return commands.executeCommand('editor.action.indentLines');
    }

    @PrototypeReflect.metadata(SymbolMetadata.Action.isChange, true)
    static decrease(): Thenable<boolean> {
        return commands.executeCommand('editor.action.outdentLines');
    }

};
