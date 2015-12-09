import {Mode} from './Mode';
import {Map, possibleCharacters} from '../Mapper';
import {ActionInsert} from '../Actions/Insert';
import {ActionMode} from '../Actions/Mode';

export class ModeInsert extends Mode {
	name = 'INSERT';

	private maps: Map[] = [
		{ keys: 'escape', command: ActionMode.toNormal },
	].concat(possibleCharacters.map(key => {
		return { keys: key, command: () => {
			ActionInsert.characterAtSelections(key);
		} };
	}));

	constructor() {
		super();

		this.maps.forEach(map => {
			this.mapper.map(map.keys, map.command, map.args);
		});
	}
}