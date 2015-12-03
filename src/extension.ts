import {commands, ExtensionContext} from 'vscode';
import {ModeManager} from './ModeManager';

export function activate(context: ExtensionContext) {
	const modeManager = new ModeManager();
	context.subscriptions.push(modeManager);

	const keys = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		context.subscriptions.push(
			commands.registerCommand(`vim.${key}`, modeManager.createInputHandler(key))
		);
	}
}