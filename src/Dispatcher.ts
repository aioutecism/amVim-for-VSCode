import {Mode} from './Modes/Mode';
import {ModesNormal} from './Modes/Normal';
import {ModesVisual} from './Modes/Visual';
import {ModesVisualBlock} from './Modes/VisualBlock';
import {ModesInsert} from './Modes/Insert';

enum MODE {NORMAL, VISUAL, VISUAL_BLOCK, INSERT};

export class Dispatcher {

	private currentMode = MODE.NORMAL;
	private modes: {[k: number]: Mode} = {
		[MODE.NORMAL]: new ModesNormal(),
		[MODE.VISUAL]: new ModesVisual(),
		[MODE.VISUAL_BLOCK]: new ModesVisualBlock(),
		[MODE.INSERT]: new ModesInsert(),
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