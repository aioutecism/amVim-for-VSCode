import {commands} from 'vscode';

export class ActionSuggestion {

    static trigger(): Thenable<boolean> {
        // TODO: Don't trigger suggest when no suggestion is available
        return commands.executeCommand('editor.action.triggerSuggest');
    }

    static hide(): Thenable<boolean> {
        return commands.executeCommand('hideSuggestWidget');
    }

}
