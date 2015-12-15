import {commands} from 'vscode';

export class ActionHistory {

	// TODO: True vim style undo and redo

	static undo(): Thenable<boolean> {
		return commands.executeCommand('undo');
	}

	static redo(): Thenable<boolean> {
		return commands.executeCommand('redo');
	}

};