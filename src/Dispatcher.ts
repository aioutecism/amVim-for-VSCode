import {Mode} from './Modes/Mode';
import {ModeNormal} from './Modes/Normal';
import {ModeVisual} from './Modes/Visual';
import {ModeVisualBlock} from './Modes/VisualBlock';
import {ModeInsert} from './Modes/Insert';

enum MODE {NORMAL, VISUAL, VISUAL_BLOCK, INSERT};

export class Dispatcher {

	private currentMode = MODE.NORMAL;
	private modes: {[k: number]: Mode} = {
		[MODE.NORMAL]: new ModeNormal(),
		[MODE.VISUAL]: new ModeVisual(),
		[MODE.VISUAL_BLOCK]: new ModeVisualBlock(),
		[MODE.INSERT]: new ModeInsert(),
	};

	inputHandler(key: string): () => void {
		return () => {
			this.modes[this.currentMode].input(key);
		};
	}

	dispose(): void {
		// Nothing to clear now.
	}
}