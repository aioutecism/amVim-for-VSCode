import {commands} from 'vscode';
import {ModeID} from '../Modes/Mode';

export class ActionMode {
	static toNormal(): void {
		commands.executeCommand(`vim.mode.${ModeID.NORMAL}`);
	}

	static toVisual(): void {
		commands.executeCommand(`vim.mode.${ModeID.VISUAL}`);
	}

	static toVisualBlock(): void {
		commands.executeCommand(`vim.mode.${ModeID.VISUAL_BLOCK}`);
	}

	static toInsert(): void {
		commands.executeCommand(`vim.mode.${ModeID.INSERT}`);
	}
};