import {CommandLine} from '../CommandLine/CommandLine';

export class ActionCommand {

    static async command(): Promise<void> {
        // this is undefined
        return await CommandLine.PromptAndRun();
    }

}

