import {commands} from 'vscode';

export class ActionSuggestion {

    static hide(): Thenable<boolean> {
        return commands.executeCommand('hideSuggestWidget');
    }

}
