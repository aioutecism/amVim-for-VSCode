import {window, Disposable} from 'vscode';
import {Mode, ModeID} from './Mode';
import {CommandMap} from '../Mappers/Command';
import {ActionDecorate} from '../Actions/Decorate';
import {ActionMoveCursor} from '../Actions/MoveCursor';
import {ActionSelection} from '../Actions/Selection';
import {ActionMode} from '../Actions/Mode';
import {MotionCharacter} from '../Motions/Character';

export class ModeVisual extends Mode {

    id = ModeID.VISUAL;
    name = 'VISUAL';

    private maps: CommandMap[] = [
        { keys: '{motion}', command: ActionMoveCursor.byMotions, args: {shouldKeepEmpty: false} },

        { keys: 'I', command: () => ActionSelection.shrinkToStarts().then(ActionMode.toInsert) },
        { keys: 'A', command: () => ActionSelection.shrinkToEnds()
            .then(ActionMoveCursor.byMotions.bind(undefined, {motions: [MotionCharacter.right()]}))
            .then(ActionMode.toInsert) },

        { keys: 'escape', command: () => ActionSelection.shrinkAStep().then((isShrinked) => {
            return isShrinked ? Promise.resolve(true) : ActionMode.toNormal();
        }) },
    ];

    private disposables: Disposable[] = [];

    constructor() {
        super();

        this.maps.forEach(map => {
            this.mapper.map(map.keys, map.command, map.args);
        });
    }

    enter(): void {
        super.enter();

        const activeTextEditor = window.activeTextEditor;
        if (activeTextEditor) {
            ActionDecorate.activeCursors(activeTextEditor, activeTextEditor.selections);
        }

        this.disposables.push(window.onDidChangeTextEditorSelection((e) => {
            ActionDecorate.activeCursors(e.textEditor, e.selections);
        }));
    }

    exit(): void {
        super.exit();

        Disposable.from(...this.disposables).dispose();

        const activeTextEditor = window.activeTextEditor;
        if (activeTextEditor) {
            ActionDecorate.remove(activeTextEditor);
        }
    }

}
