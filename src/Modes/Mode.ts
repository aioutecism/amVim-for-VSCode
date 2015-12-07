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
		this.inputs.push(key);

		const map = this.mapper.match(this.inputs);

		if (map) {
			map.command(map.args);
			this.reset();
		}
	}
}