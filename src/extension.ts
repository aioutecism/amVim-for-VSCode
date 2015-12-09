import {commands, ExtensionContext} from 'vscode';
import {Dispatcher, MODE} from './Dispatcher';
import {possibleKeys} from './Mapper';

export function activate(context: ExtensionContext) {
	const dispatcher = new Dispatcher();
	context.subscriptions.push(dispatcher);

	possibleKeys.forEach(key => {
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