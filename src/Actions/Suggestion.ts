import {commands} from 'vscode';

export class ActionSuggestion {

    static triggerCharacters = /[a-z0-9_,.(]/i;

    static trigger(args: {key: string}): Thenable<boolean> {
        // HACK: Work around lack of keybinding context API
        if (! ActionSuggestion.triggerCharacters.test(args.key)) {
            return;
        }

        // TODO: Don't trigger suggest when no suggestion is available

        return commands.executeCommand('editor.action.triggerSuggest');
    }

    static hide(): Thenable<boolean> {
        return commands.executeCommand('hideSuggestWidget');
    }

}
