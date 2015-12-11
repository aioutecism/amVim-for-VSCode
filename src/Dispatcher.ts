import {window, commands, ExtensionContext} from 'vscode';
import * as Keys from './Keys';
import {Mode, ModeID} from './Modes/Mode';
import {ModeNormal} from './Modes/Normal';
import {ModeVisual} from './Modes/Visual';
import {ModeVisualBlock} from './Modes/VisualBlock';
import {ModeInsert} from './Modes/Insert';

export class Dispatcher {

	private currentMode: Mode;
	private modes: {[k: number]: Mode} = {
		[ModeID.NORMAL]: new ModeNormal(),
		[ModeID.VISUAL]: new ModeVisual(),
		[ModeID.VISUAL_BLOCK]: new ModeVisualBlock(),
		[ModeID.INSERT]: new ModeInsert(),
	};

	constructor(context: ExtensionContext) {
		[
			ModeID.NORMAL,
			ModeID.VISUAL,
			ModeID.VISUAL_BLOCK,
			ModeID.INSERT
		].forEach(mode => {
			context.subscriptions.push(commands.registerCommand(`vim.mode.${mode}`, () => {
				this.switchMode(mode);
			}));
		})

		Keys.all.forEach(key => {
			context.subscriptions.push(commands.registerCommand(`vim.${key}`, this.inputHandler(key)));
		});

		this.switchMode(ModeID.NORMAL);
	}

	inputHandler(key: string): () => void {
		return () => {
			this.currentMode.input(key);
		};
	}

	switchMode(id: ModeID): void {
		if (this.currentMode === this.modes[id]) {
			return;
		}

		if (this.currentMode) {
			this.currentMode.end();
		}

		this.currentMode = this.modes[id];
		this.currentMode.start();
	}

	dispose(): void {
		Object.keys(this.modes).forEach(id => {
			(this.modes[id] as Mode).dispose();
		});
	}
}