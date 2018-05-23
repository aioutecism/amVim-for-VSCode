import { CommandBase } from './Base';
import WriteAllCommand from './WriteAll';
import QuitAllCommand from './QuitAll';

class WriteQuitAllCommand extends CommandBase {
  constructor() {
    super();
  }
  async execute(): Promise<void> {
    await WriteAllCommand.execute();
    await QuitAllCommand.execute();
  }
}

export default new WriteQuitAllCommand();
