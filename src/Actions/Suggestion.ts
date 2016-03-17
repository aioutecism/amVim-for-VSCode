import {commands} from 'vscode';
import {Configuration} from '../Configuration';

export class ActionSuggestion {

    static hide(): Thenable<boolean> {
        return commands.executeCommand('hideSuggestWidget');
    }

}
