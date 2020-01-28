import { commands, window, Position } from 'vscode';
import { Motion } from './Motion';

export class MotionNavigation extends Motion {
    private command: string;

    static toDeclaration(): Motion {
        const obj = new MotionNavigation({ isLinewise: true });
        obj.command = 'editor.action.goToDeclaration';
        return obj;
    }

    static toTypeDefinition(): Motion {
        const obj = new MotionNavigation({ isLinewise: true });
        obj.command = 'editor.action.goToTypeDefinition';
        return obj;
    }

    async apply(from: Position): Promise<Position> {
        from = await super.apply(from);

        const activeTextEditor = window.activeTextEditor;

        if (!activeTextEditor) {
            return from;
        }

        await commands.executeCommand(this.command);

        return activeTextEditor.selection.active;
    }
}
