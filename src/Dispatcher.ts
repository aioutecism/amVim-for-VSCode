import {window} from 'vscode';
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

	constructor() {
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

		this.currentMode = this.modes[id];
		this.currentMode.clearInputs();

		window.setStatusBarMessage(`-- ${this.currentMode.name} --`);
	}

	dispose(): void {
		// Nothing to clear now.
	}
}