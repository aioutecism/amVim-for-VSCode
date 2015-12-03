import * as MovementsCharacter from './Movements/Character';

enum MODE {NORMAL, VISUAL, VISUAL_BLOCK, INSERT};

export class ModeManager {

	private mode: MODE = MODE.NORMAL;

	public createInputHandler(key: string): any {
		// TODO
		if (key === 'h') {
			return MovementsCharacter.left;
		}
		else if (key === 'l') {
			return MovementsCharacter.right;
		}
		else if (key === 'k') {
			return MovementsCharacter.up;
		}
		else if (key === 'j') {
			return MovementsCharacter.down;
		}
	}

	public dispose(): void {
		// Nothing to clear now.
	}
}