import {commands} from 'vscode';
import {StaticReflect} from '../LanguageExtensions/StaticReflect';
import {SymbolMetadata} from '../Symbols/Metadata';

export class ActionIndent {

    @StaticReflect.metadata(SymbolMetadata.Action.isChange, true)
    static increase(): Thenable<boolean> {
        return commands.executeCommand('editor.action.indentLines');
    }

    @StaticReflect.metadata(SymbolMetadata.Action.isChange, true)
    static decrease(): Thenable<boolean> {
        return commands.executeCommand('editor.action.outdentLines');
    }

};
