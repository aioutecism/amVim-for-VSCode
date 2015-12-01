import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	const disposables = [
		vscode.commands.registerCommand('vim.h', () => {
			// TODO - Move Cursor Left
		})
	];

	context.subscriptions.push(...disposables);
}