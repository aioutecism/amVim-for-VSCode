import * as vscode from 'vscode';
import * as Cursor from './Actions/Cursor';

export function activate(context: vscode.ExtensionContext) {

	const disposables = [
		vscode.commands.registerCommand('vim.h', () => {
			Cursor.characterLeft();
		}),
		vscode.commands.registerCommand('vim.l', () => {
			Cursor.characterRight();
		}),
		vscode.commands.registerCommand('vim.j', () => {
			Cursor.characterBottom();
		}),
		vscode.commands.registerCommand('vim.k', () => {
			Cursor.characterTop();
		})
	];

	context.subscriptions.push(...disposables);
}