import {window, commands, Disposable, ExtensionContext} from 'vscode';
import * as Keys from './Keys';
import {Mode, ModeID} from './Modes/Mode';
import {ModeNormal} from './Modes/Normal';
import {ModeVisual} from './Modes/Visual';
import {ModeVisualLine} from './Modes/VisualLine';
import {ModeInsert} from './Modes/Insert';
import {ActionMode} from './Actions/Mode';
import {ActionMoveCursor} from './Actions/MoveCursor';

export class Dispatcher {

    private currentMode: Mode;
    private modes: {[k: number]: Mode} = {
        [ModeID.NORMAL]: new ModeNormal(),
        [ModeID.VISUAL]: new ModeVisual(),
        [ModeID.VISUAL_LINE]: new ModeVisualLine(),
        [ModeID.INSERT]: new ModeInsert(),
    };
    private disposables: Disposable[] = [];

    constructor(context: ExtensionContext) {
        [
            ModeID.NORMAL,
            ModeID.VISUAL,
            ModeID.VISUAL_LINE,
            ModeID.INSERT
        ].forEach(mode => {
            context.subscriptions.push(commands.registerCommand(`vim.mode.${mode}`, () => {
                this.switchMode(mode);
            }));
        })

        Keys.all.forEach(key => {
            context.subscriptions.push(commands.registerCommand(`vim.${key}`, this.inputHandler(key)));
        });

        ActionMoveCursor.updatePreferedCharacter();

        this.switchMode(ModeID.NORMAL);

        this.disposables.push(
            window.onDidChangeTextEditorSelection(() => {
                ActionMode.switchByActiveSelections(this.currentMode.id);
                ActionMoveCursor.updatePreferedCharacter();
            }),
            window.onDidChangeActiveTextEditor(() => {
                ActionMode.switchByActiveSelections(this.currentMode.id);
                ActionMoveCursor.updatePreferedCharacter();
            })
        );
    }

    inputHandler(key: string): () => void {
        return () => {
            this.currentMode.input(key);
        };
    }

    switchMode(id: ModeID): void {
        if (this.currentMode === this.modes[id]) {
            return;
        }

        if (this.currentMode) {
            this.currentMode.exit();
        }

        this.currentMode = this.modes[id];
        this.currentMode.enter();
    }

    dispose(): void {
        Disposable.from(...this.disposables).dispose();

        Object.keys(this.modes).forEach(id => {
            (this.modes[id] as Mode).dispose();
        });
    }

}
