import {commands, Selection} from 'vscode';
import {ModeID} from '../Modes/Mode';

export class ActionMode {

    static toNormal(): Thenable<boolean> {
        return commands.executeCommand(`vim.mode.${ModeID.NORMAL}`);
    }

    static toVisual(): Thenable<boolean> {
        return commands.executeCommand(`vim.mode.${ModeID.VISUAL}`);
    }

    static toVisualBlock(): Thenable<boolean> {
        return commands.executeCommand(`vim.mode.${ModeID.VISUAL_BLOCK}`);
    }

    static toVisualLine(): Thenable<boolean> {
        return commands.executeCommand(`vim.mode.${ModeID.VISUAL_LINE}`);
    }

    static toInsert(): Thenable<boolean> {
        return commands.executeCommand(`vim.mode.${ModeID.INSERT}`);
    }

    static switchBySelections(currentMode: ModeID, selections: Selection[]): Thenable<boolean> {
        let mode: ModeID;

        if (currentMode === ModeID.INSERT) {
            return Promise.resolve(true);
        }

        if (selections.length > 1) {
            mode = ModeID.VISUAL_BLOCK;
        }
        else if (! selections[0].isEmpty) {
            mode = ModeID.VISUAL;
        }
        else {
            mode = ModeID.NORMAL;
        }

        if (mode === currentMode) {
            return Promise.resolve(true);
        }
        else {
            return commands.executeCommand(`vim.mode.${mode}`);
        }
    }

};
