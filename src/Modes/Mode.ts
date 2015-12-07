import {Mapper} from '../Mapper'

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

	input(key: string) {
		let inputs: string[];

		if (key === 'escape') {
			inputs = [key];
		}
		else {
			this.inputs.push(key);
			inputs = this.inputs;
		}

		const map = this.mapper.match(inputs);

		if (map) {
			this.reset();
			map.command(map.args);
		}
	}
}