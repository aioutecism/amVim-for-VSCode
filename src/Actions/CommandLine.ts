import * as vscode from 'vscode';
import { Command } from './Commands/Base';
import { GoToLineCommand } from './Commands/GoToLine';
import { WriteCommand } from './Commands/Write';
import { WriteAllCommand } from './Commands/WriteAll';
import { QuitCommand } from './Commands/Quit';
import { QuitAllCommand } from './Commands/QuitAll';
import { WriteQuitCommand } from './Commands/WriteQuit';
import { WriteQuitAllCommand } from './Commands/WriteQuitAll';
import { VerticalSplitCommand } from './Commands/VisualSplit';
import { NewFileCommand } from './Commands/NewFile';
import { VerticalNewFileCommand } from './Commands/VerticalNewFile';

export class ActionCommandLine {

    private static maps: { [key: string]: typeof Command } = {
        'w': WriteCommand,
        'write': WriteCommand,
        'wa': WriteAllCommand,
        'wall': WriteAllCommand,

        'q': QuitCommand,
        'quit': QuitCommand,
        'qa': QuitAllCommand,
        'qall': QuitAllCommand,

        'wq': WriteQuitCommand,
        'x': WriteQuitCommand,

        'wqa': WriteQuitAllCommand,
        'wqall': WriteQuitAllCommand,
        'xa': WriteQuitAllCommand,
        'xall': WriteQuitAllCommand,

        'vs': VerticalSplitCommand,
        'vsp': VerticalSplitCommand,

        'new': NewFileCommand,
        'vne': VerticalNewFileCommand,
        'vnew': VerticalNewFileCommand,
    };

    static run(input: string | undefined): Thenable<boolean | undefined> {
        if (input && input[0] === ':') {
            input = input.slice(1);
        }

        if (!input || input.length === 0) {
            return Promise.resolve(false);
        }

        const commandConstructor =
              this.maps[input] ? this.maps[input]
            : Number.isInteger(Number(input)) ? GoToLineCommand
            : undefined;

        if (!commandConstructor) {
            return Promise.resolve(false);
        }

        const command = new commandConstructor(input);

        return command.execute();
    }

    static promptAndRun(): Thenable<boolean | undefined> {
        if (!vscode.window.activeTextEditor) {
            return Promise.resolve(false);
        }

        return vscode.window.showInputBox({
            prompt: 'Vim command line',
            value: ':',
            ignoreFocusOut: false,
            valueSelection: [1, 1],
        })
            .then((input) => ActionCommandLine.run(input));
    }

}
