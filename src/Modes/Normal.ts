import {Mode} from './Mode'
import {Map} from '../Mapper';
import {MotionCharacter} from '../Motions/Character';

export class ModesNormal extends Mode {
	private maps: Map[] = [
		{ keys: ['h'], command: () => { (new MotionCharacter()).left() } },
		{ keys: ['l'], command: () => { (new MotionCharacter()).right() } },
		{ keys: ['k'], command: () => { (new MotionCharacter()).up() } },
		{ keys: ['j'], command: () => { (new MotionCharacter()).down() } },
	];

	constructor() {
		super();

		this.maps.forEach(map => {
			this.mapper.map(map.keys, map.command, map.args);
		});
	}
}