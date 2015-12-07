import {commands, ExtensionContext} from 'vscode';
import {Dispatcher} from './Dispatcher';

export function activate(context: ExtensionContext) {
	const dispatcher = new Dispatcher();
	context.subscriptions.push(dispatcher);

	let keys = [
		'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
		'1234567890',
		'#$%*=@^_`~,./:;?',
		'()[]{}<>\'"',
	].join('').split('');

	keys.push(
		'space',
		'enter',
		'escape',
		'backspace',

		'alt+b',
		'alt+w',

		'ctrl+[',
		'ctrl+b',
		'ctrl+d',
		'ctrl+e',
		'ctrl+f',
		'ctrl+r',
		'ctrl+u',
		'ctrl+w',
		'ctrl+y',

		'shift+enter'
	);

	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		context.subscriptions.push(commands.registerCommand(`vim.${key}`, dispatcher.inputHandler(key)));
	}
}