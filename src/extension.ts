import * as vscode from 'vscode';
import * as MovementsCharacter from './Movements/Character';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(...[
		vscode.commands.registerCommand('vim.h', () => {
			MovementsCharacter.left();
		}),
		vscode.commands.registerCommand('vim.l', () => {
			MovementsCharacter.right();
		}),
		vscode.commands.registerCommand('vim.j', () => {
			MovementsCharacter.bottom();
		}),
		vscode.commands.registerCommand('vim.k', () => {
			MovementsCharacter.top();
		})
	]);
}