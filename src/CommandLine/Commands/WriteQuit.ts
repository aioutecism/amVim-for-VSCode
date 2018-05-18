import { CommandBase } from './Base';
import WriteCommand from './Write';
import QuitCommand from './Quit'

class WriteQuitCommand extends CommandBase{
  constructor() {
    super()
    this.name = 'write'
  }
  async execute(): Promise<void> {
    await WriteCommand.execute()
    await QuitCommand.execute()
  }
}

export default new WriteQuitCommand()
