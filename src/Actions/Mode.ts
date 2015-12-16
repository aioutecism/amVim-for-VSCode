import {commands} from 'vscode';
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

};
