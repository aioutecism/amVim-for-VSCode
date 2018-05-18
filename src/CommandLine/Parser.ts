import { CommandBase } from './Commands/Base';
import WriteCommand from './Commands/Write';
import WallCommand from './Commands/WriteAll';
import QuitCommand from './Commands/Quit';
import QuitAllCommand from './Commands/QuitAll';
import WriteQuitCommand from './Commands/WriteQuit';
import WriteQuitAllCommand from './Commands/WriteQuitAll';
import VisualSplitCommand from './Commands/VisualSplit';
import NewFileCommand from './Commands/NewFile'
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
    writequit: WriteQuitCommand,
    x: WriteQuitCommand,

    wqa: WriteQuitAllCommand,
    wqall: WriteQuitAllCommand,
    xa: WriteQuitAllCommand,
    xall: WriteQuitAllCommand,

    vs: VisualSplitCommand,
    vsp: VisualSplitCommand,
    sp: VisualSplitCommand,
    split: VisualSplitCommand,
    vsplit: VisualSplitCommand,
    ne: NewFileCommand,
    vne: NewFileCommand,
    new: NewFileCommand,
    vnew: NewFileCommand
}

const isNumber = (input: string | undefined): boolean => {
    return !Number.isNaN(Number(input))
}

export function parser(input: string): CommandBase | undefined {
    if (commandParsers[input]) {
        return commandParsers[input]
    } else if (isNumber(input)) {
        return GoToLineCommand
    } else {
        return undefined;
    }
}