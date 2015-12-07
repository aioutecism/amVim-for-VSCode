export interface Command {
	(args?: {}): void;
}

export interface Map {
	keys?: string[];
	command: Command;
	args?: {};
}

export class Mapper {
	private separator = '->';
	private maps: {[keys: string]: Map} = {};

	private key(inputs: string[]): string {
		return inputs.join(this.separator);
	}

	map(keys: string[], command: Command, args?: {}): void {
		this.maps[this.key(keys)] = {
			command: command,
			args: args || {},
		};
	}

	unmap(keys: string[]): void {
		delete this.maps[this.key(keys)];
	}

	match(inputs: string[]): Map {
		let map = this.maps[this.key(inputs)];

		// TODO: part match

		if (map) {
			return {
				command: map.command,
				args: map.args,
			}
		}
		else {
			return null;
		}
	}
}