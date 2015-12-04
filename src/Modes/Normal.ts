import {IMode} from './IMode'
import {MotionCharacter} from '../Motions/Character';

export class ModesNormal implements IMode {
	input(key: string) {
		// TODO
		if (key === 'h') {
			let motion = new MotionCharacter();
			motion.left();
		}
		else if (key === 'l') {
			let motion = new MotionCharacter();
			motion.right();
		}
		else if (key === 'k') {
			let motion = new MotionCharacter();
			motion.up();
		}
		else if (key === 'j') {
			let motion = new MotionCharacter();
			motion.down();
		}
	}
}