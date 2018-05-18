import * as vscode from 'vscode';
import { parser } from './Parser';

export class CommandLine {
  public static async Run(command: string | undefined): Promise<void> {
      if (!command || command.length === 0) {
          return;
      }
  
      try {
          const cmd = parser(command);
          if (cmd) {
              await cmd.execute(command);
          }
      } catch (e) {
          console.log(e)
      }
  }

  public static async PromptAndRun(): Promise<void> {
      if (!vscode.window.activeTextEditor) {
          return
      }
      let text = ''
      try {
          let cmd = await vscode.window.showInputBox(this.getInputBoxOptions(text));
          if (cmd && cmd[0] === ':') {
              cmd = cmd.slice(1);
          }
          return await CommandLine.Run(cmd);
      } catch (e) {
          console.log(e)
      }
  }

  private static getInputBoxOptions(text: string): vscode.InputBoxOptions {
      return {
          prompt: 'Vim command line',
          value: ':' + text,
          ignoreFocusOut: false,
          valueSelection: [ text.length + 1, text.length + 1]
      };
  }
}
