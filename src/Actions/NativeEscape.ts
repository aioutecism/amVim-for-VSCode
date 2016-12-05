import {commands} from 'vscode';

export class ActionNativeEscape {

    static press(): Thenable<boolean> {
        return Promise.resolve(true)
            .then(() => commands.executeCommand('leaveSnippet'))
            .then(() => commands.executeCommand('closeParameterHints'))
            .then(() => commands.executeCommand('hideSuggestWidget'));
    }

}
