import {commands, ExtensionContext} from 'vscode';
import {Dispatcher} from './Dispatcher';

export function activate(context: ExtensionContext) {
	const dispatcher = new Dispatcher();
	context.subscriptions.push(dispatcher);

	const keys = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		context.subscriptions.push(commands.registerCommand(`vim.${key}`, dispatcher.inputHandler(key)));
	}
}