import {commands} from 'vscode';
import {ActionSelection} from './Selection';

export class ActionHistory {

    static undo(): Thenable<boolean> {
        return commands.executeCommand('undo')
        .then(() => ActionSelection.shrinkToActives());
    }

    static redo(): Thenable<boolean> {
        return commands.executeCommand('redo')
        .then(() => ActionSelection.shrinkToActives());
    }

}
