export interface Command {
	(args?: {}): void;
}

export interface Map {
	keys: string;
	command: Command;
	args?: {};
}

export class Mapper {
	private maps: {[keys: string]: Map} = {};

	map(keys: string, command: Command, args?: {}): void {
		this.maps[keys] = {
			keys: keys,
			command: command,
			args: args || {},
		};
	}

	unmap(keys: string): void {
		delete this.maps[keys];
	}

	match(inputs: string[]): Map {
		let map = this.maps[inputs.join(' ')];

		// TODO: part match

		return map;
	}
}