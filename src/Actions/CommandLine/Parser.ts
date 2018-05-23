import { CommandBase } from './Commands/Base';
import WriteCommand from './Commands/Write';
import WallCommand from './Commands/WriteAll';
import QuitCommand from './Commands/Quit';
import QuitAllCommand from './Commands/QuitAll';
import WriteQuitCommand from './Commands/WriteQuit';
import WriteQuitAllCommand from './Commands/WriteQuitAll';
import VisualSplitCommand from './Commands/VisualSplit';
import NewFileCommand from './Commands/NewFile';
import VerticalNewFileCommand from './Commands/VerticalNewFile';
import GoToLineCommand from './Commands/GoToLine';

const commandParsers = {
    w: WriteCommand,
    write: WriteCommand,
    wa: WallCommand,
    wall: WallCommand,

    q: QuitCommand,
    quit: QuitCommand,
    qa: QuitAllCommand,
    qall: QuitAllCommand,

    wq: WriteQuitCommand,
    x: WriteQuitCommand,

    wqa: WriteQuitAllCommand,
    wqall: WriteQuitAllCommand,
    xa: WriteQuitAllCommand,
    xall: WriteQuitAllCommand,

    vs: VisualSplitCommand,
    vsp: VisualSplitCommand,

    new: NewFileCommand,
    vne: VerticalNewFileCommand,
    vnew: VerticalNewFileCommand
};

export function parser(input: string): CommandBase | undefined {
    if (commandParsers[input]) {
        return commandParsers[input];
    } else if (Number.isInteger(Number(input))) {
        return GoToLineCommand;
    } else {
        return undefined;
    }
}
