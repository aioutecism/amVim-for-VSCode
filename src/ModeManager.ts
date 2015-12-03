import * as MotionsCharacter from './Motions/Character';

enum MODE {NORMAL, VISUAL, VISUAL_BLOCK, INSERT};

export class ModeManager {

	private mode: MODE = MODE.NORMAL;

	public createInputHandler(key: string): any {
		// TODO
		if (key === 'h') {
			return MotionsCharacter.left;
		}
		else if (key === 'l') {
			return MotionsCharacter.right;
		}
		else if (key === 'k') {
			return MotionsCharacter.up;
		}
		else if (key === 'j') {
			return MotionsCharacter.down;
		}
	}

	public dispose(): void {
		// Nothing to clear now.
	}
}