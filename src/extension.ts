import {commands, ExtensionContext} from 'vscode';
import {Dispatcher, MODE} from './Dispatcher';

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

	keys.forEach(key => {
		context.subscriptions.push(commands.registerCommand(`vim.${key}`, dispatcher.inputHandler(key)));
	});

	let modes = [
		MODE.NORMAL,
		MODE.VISUAL,
		MODE.VISUAL_BLOCK,
		MODE.INSERT
	];

	modes.forEach(mode => {
		context.subscriptions.push(commands.registerCommand(`vim.mode.${mode}`, () => {
			dispatcher.switchMode(mode);
		}));
	})
}