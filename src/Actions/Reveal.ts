import {window, Range, TextEditorRevealType} from 'vscode';

export class ActionReveal {

    static primaryCursor(args: {shouldCenterIfOutsideViewport?: boolean} = {}): Thenable<boolean> {
        args.shouldCenterIfOutsideViewport = args.shouldCenterIfOutsideViewport === undefined ? true : args.shouldCenterIfOutsideViewport;

        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        const activePosition = activeTextEditor.selection.active;
        activeTextEditor.revealRange(
            new Range(activePosition, activePosition),
            (args.shouldCenterIfOutsideViewport
                ? TextEditorRevealType.InCenterIfOutsideViewport
                : TextEditorRevealType.Default)
        );

        return Promise.resolve(true);
    }

}
