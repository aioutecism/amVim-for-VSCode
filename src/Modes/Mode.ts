import {window} from 'vscode';
import {Mapper, Map, MatchResultType} from '../Mapper';

export enum ModeID {NORMAL, VISUAL, VISUAL_BLOCK, INSERT};

export interface Command {
	(args?: {}): Thenable<boolean>;
}

export abstract class Mode {
	name: string;

	private pendings: Command[] = [];
	private inputs: string[] = [];
	protected mapper: Mapper = new Mapper();

	start(): void {
		window.setStatusBarMessage(`-- ${this.name} --`);
	}

	end(): void {
		this.clearInputs();
		this.clearPendings();
	}

	dispose(): void {
		this.end();
	}

	private clearInputs(): void {
		this.inputs = [];
	}

	private clearPendings(): void {
		this.pendings = [];
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
			this.clearInputs();
			this.pendings.push(() => {
				return map.command(map.args);
			});
			this.execute();
		}
		else if (type === MatchResultType.WAITING) {
			// TODO: Update status bar
		}
	}

	private	execute(): Thenable<boolean> {
		const action = this.pendings.shift();

		if (! action) {
			return Promise.resolve(true);
		}

		action().then(
			() => { this.execute(); },
			() => { this.clearPendings(); }
		);
	}
}