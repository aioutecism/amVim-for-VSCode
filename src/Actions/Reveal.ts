import {window, Range, TextEditorRevealType} from 'vscode';

export class ActionReveal {

    static primaryCursor(args: {center?: boolean} = {}): Thenable<boolean> {
        args.center = args.center === undefined ? false : args.center;

        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        const activePosition = activeTextEditor.selection.active;
        const kind = args.center
            ? TextEditorRevealType.InCenter
            : TextEditorRevealType.Default;
        activeTextEditor.revealRange(new Range(activePosition, activePosition), kind);

        return Promise.resolve(true);
    }

}
