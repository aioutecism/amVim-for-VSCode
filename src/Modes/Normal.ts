import {window, Disposable} from 'vscode';
import {Mode} from './Mode';
import {Map} from '../Mapper';
import {ActionDecorate} from '../Actions/Decorate';
import {ActionMoveCursor} from '../Actions/MoveCursor';
import {ActionInsert} from '../Actions/Insert';
import {ActionDelete} from '../Actions/Delete';
import {ActionHistory} from '../Actions/History';
import {ActionIndent} from '../Actions/Indent';
import {ActionMode} from '../Actions/Mode';

export class ModeNormal extends Mode {

    name = 'NORMAL';

    private maps: Map[] = [
        { keys: 'h', command: ActionMoveCursor.characterLeft },
        { keys: 'l', command: ActionMoveCursor.characterRight },
        { keys: 'k', command: ActionMoveCursor.characterUp },
        { keys: 'j', command: ActionMoveCursor.characterDown },

        { keys: 'w', command: ActionMoveCursor.wordNextStart },
        { keys: 'e', command: ActionMoveCursor.wordNextEnd },
        { keys: 'b', command: ActionMoveCursor.wordPrevStart },

        { keys: '0', command: ActionMoveCursor.lineStart },
        { keys: '$', command: ActionMoveCursor.lineEnd },

        { keys: 'g g', command: ActionMoveCursor.documentStart },
        { keys: 'G', command: ActionMoveCursor.documentEnd },

        { keys: 'i', command: ActionMode.toInsert },
        { keys: 'v', command: ActionMode.toVisual },
        { keys: 'ctrl+v', command: ActionMode.toVisualBlock },
        { keys: 'V', command: ActionMode.toVisualLine },

        { keys: 'o', command: () => ActionInsert.newLineAfter().then(ActionMode.toInsert) },
        { keys: 'O', command: () => ActionInsert.newLineBefore().then(ActionMode.toInsert) },

        { keys: 'd d', command: ActionDelete.line },

        { keys: 'u', command: ActionHistory.undo },
        { keys: 'ctrl+r', command: ActionHistory.redo },

        { keys: '< <', command: ActionIndent.decrease },
        { keys: '> >', command: ActionIndent.increase },

        { keys: 'escape', command: () => Promise.resolve(true) },
    ];

    private disposables: Disposable[] = [];

    constructor() {
        super();

        this.maps.forEach(map => {
            this.mapper.map(map.keys, map.command, map.args);
        });
    }

    start(): void {
        super.start();

        this.disposables.push(window.onDidChangeTextEditorSelection((e) => {
            ActionDecorate.activeCursors(e.textEditor, e.selections);
        }));
    }

    end(): void {
        super.end();

        Disposable.from(...this.disposables).dispose();
    }

}
