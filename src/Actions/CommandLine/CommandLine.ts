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
          console.error(e);
      }
  }

  public static async PromptAndRun(): Promise<void> {
      if (!vscode.window.activeTextEditor) {
          return;
      }
      try {
          let cmd = await vscode.window.showInputBox(CommandLine.getInputBoxOptions());
          if (cmd && cmd[0] === ':') {
              cmd = cmd.slice(1);
          }
          return await CommandLine.Run(cmd);
      } catch (e) {
          console.error(e);
      }
  }

  private static getInputBoxOptions(): vscode.InputBoxOptions {
      return {
          prompt: 'Vim command line',
          value: ':',
          ignoreFocusOut: false,
          valueSelection: [1, 1]
      };
  }
}
