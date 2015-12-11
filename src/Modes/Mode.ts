import {Mapper, Map, MatchResultType} from '../Mapper';

export enum MODE {NORMAL, VISUAL, VISUAL_BLOCK, INSERT};

export abstract class Mode {
	name: string;

	private inputs: string[] = [];
	protected mapper: Mapper;

	constructor() {
		this.mapper = new Mapper();
		this.clearInputs();
	}

	clearInputs(): void {
		this.inputs = [];
	}

	input(key: string): void {
		let inputs: string[];

		if (key === 'escape') {
			inputs = [key];
		}
		else {
			this.inputs.push(key);
			inputs = this.inputs;
		}

		const {type, map} = this.mapper.match(inputs);

		if (type === MatchResultType.FAILED) {
			this.clearInputs();
		}
		else if (type === MatchResultType.FOUND) {
			map.command(map.args);
			this.clearInputs();
		}
		else if (type === MatchResultType.WAITING) {
			// TODO: Update status bar
		}
	}
}