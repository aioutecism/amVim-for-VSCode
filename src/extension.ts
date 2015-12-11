import {commands, ExtensionContext} from 'vscode';
import {ModeID} from './Modes/Mode';
import {Dispatcher} from './Dispatcher';
import * as Keys from './Keys';

export function activate(context: ExtensionContext) {
	const dispatcher = new Dispatcher();
	context.subscriptions.push(dispatcher);

	Keys.all.forEach(key => {
		context.subscriptions.push(commands.registerCommand(`vim.${key}`, dispatcher.inputHandler(key)));
	});

	let modes = [
		ModeID.NORMAL,
		ModeID.VISUAL,
		ModeID.VISUAL_BLOCK,
		ModeID.INSERT
	];

	modes.forEach(mode => {
		context.subscriptions.push(commands.registerCommand(`vim.mode.${mode}`, () => {
			dispatcher.switchMode(mode);
		}));
	})
}