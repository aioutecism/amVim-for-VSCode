import {window} from 'vscode';
import {MatchResultKind} from '../Mappers/Generic';
import {CommandMapper} from '../Mappers/Command';

export enum ModeID {NORMAL, VISUAL, VISUAL_LINE, INSERT};

export interface Command {
    (args?: {}): Thenable<boolean>;
}

export abstract class Mode {

    id: ModeID;
    name: string;

    private pendings: Command[] = [];
    private executing: boolean = false;
    private inputs: string[] = [];

    protected mapper: CommandMapper = new CommandMapper();

    enter(): void {
        this.updateStatusBar();
    }

    private updateStatusBar(message?: string): void {
        let status = `-- ${this.name} --`;

        if (message) {
            status += ` ${message}`;
        }

        window.setStatusBarMessage(status);
    }

    exit(): void {
        this.clearInputs();
        this.clearPendings();
    }

    dispose(): void {
        this.exit();
    }

    private clearInputs(): void {
        this.inputs = [];
    }

    private clearPendings(): void {
        this.pendings = [];
    }

    input(key: string): MatchResultKind {
        let inputs: string[];

        if (key === 'escape') {
            inputs = [key];
        }
        else {
            this.inputs.push(key);
            inputs = this.inputs;
        }

        const {kind, map} = this.mapper.match(inputs);

        if (kind === MatchResultKind.FAILED) {
            this.updateStatusBar();
            this.clearInputs();
        }
        else if (kind === MatchResultKind.FOUND) {
            this.updateStatusBar();
            this.clearInputs();
            this.pushCommand(() => {
                return map.command(map.args);
            });
            this.execute();
        }
        else if (kind === MatchResultKind.WAITING) {
            this.updateStatusBar(`${this.inputs.join(' ')} and...`);
        }

        return kind;
    }

    protected pushCommand(command: Command): void {
        this.pendings.push(command);
    }

    protected execute(): Thenable<boolean> {
        if (this.executing) {
            return;
        }

        this.executing = true;

        const one = () => {
            const action = this.pendings.shift();

            if (! action) {
                this.executing = false;
                return;
            }

            action().then(
                one.bind(this),
                this.clearPendings.bind(this)
            );
        };

        one();
    }

}
