import { window, TextEditorCursorStyle } from 'vscode';

export class ActionBlockCursor {
  static on(): Thenable<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
          return Promise.resolve(false);
        }

        activeTextEditor.options.cursorStyle = TextEditorCursorStyle.Block;

        resolve(true);
      }, 0);
    });
  }

  static off(): Thenable<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
          return Promise.resolve(false);
        }

        activeTextEditor.options.cursorStyle = TextEditorCursorStyle.Line;

        resolve(true);
      }, 0);
    });
  }
}
