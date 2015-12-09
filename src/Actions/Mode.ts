import {commands} from 'vscode';
import {MODE} from '../Dispatcher';

export class ActionMode {
	static toNormal(): void {
		commands.executeCommand(`vim.mode.${MODE.NORMAL}`);
	}

	static toVisual(): void {
		commands.executeCommand(`vim.mode.${MODE.VISUAL}`);
	}

	static toVisualBlock(): void {
		commands.executeCommand(`vim.mode.${MODE.VISUAL_BLOCK}`);
	}

	static toInsert(): void {
		commands.executeCommand(`vim.mode.${MODE.INSERT}`);
	}
};