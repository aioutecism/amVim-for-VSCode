import {Mapper, MatchResultType} from '../Mapper'

export abstract class Mode {
	private inputs: string[];
	protected mapper: Mapper;

	constructor() {
		this.mapper = new Mapper();
		this.reset();
	}

	reset(): void {
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
			this.reset();
		}
		else if (type === MatchResultType.FOUND) {
			this.reset()
			map.command(map.args);
		}
		else if (type === MatchResultType.WAITING) {
			// TODO: Update status bar
		}
	}
}