import {window, Range, TextEditorRevealType} from 'vscode';

export class ActionReveal {

    static primaryCursor(args: {revealType?: TextEditorRevealType} = {}): Thenable<boolean> {
        args.revealType = args.revealType === undefined ? TextEditorRevealType.Default : args.revealType;

        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        const activePosition = activeTextEditor.selection.active;
        activeTextEditor.revealRange(new Range(activePosition, activePosition), args.revealType);

        return Promise.resolve(true);
    }

}
