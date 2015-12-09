import {Mapper, Map, MatchResultType} from '../Mapper';

export abstract class Mode {
	name: string;

	private inputs: string[] = [];
	protected mapper: Mapper;

	constructor() {
		this.mapper = new Mapper();
		this.cleanup();
	}

	cleanup(): void {
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
			this.cleanup();
		}
		else if (type === MatchResultType.FOUND) {
			this.cleanup()
			map.command(map.args);
		}
		else if (type === MatchResultType.WAITING) {
			// TODO: Update status bar
		}
	}
}