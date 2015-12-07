import {Mode} from './Mode'
import {Map} from '../Mapper';
import {ActionMoveCursor} from '../Actions/MoveCursor';

export class ModeNormal extends Mode {
	private maps: Map[] = [
		{ keys: 'h', command: ActionMoveCursor.characterLeft },
		{ keys: 'l', command: ActionMoveCursor.characterRight },
		{ keys: 'k', command: ActionMoveCursor.characterUp },
		{ keys: 'j', command: ActionMoveCursor.characterDown },

		{ keys: '0', command: ActionMoveCursor.lineStart },
		{ keys: '$', command: ActionMoveCursor.lineEnd },
	];

	constructor() {
		super();

		this.maps.forEach(map => {
			this.mapper.map(map.keys, map.command, map.args);
		});
	}
}