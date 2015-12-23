import {window, Disposable} from 'vscode';
import {Mode} from './Mode';
import {CommandMap} from '../CommandMapper';
import {ActionDecorate} from '../Actions/Decorate';
import {ActionMoveCursor} from '../Actions/MoveCursor';
import {ActionInsert} from '../Actions/Insert';
import {ActionDelete} from '../Actions/Delete';
import {ActionSuggestion} from '../Actions/Suggestion';
import {ActionJoinLines} from '../Actions/JoinLines';
import {ActionHistory} from '../Actions/History';
import {ActionIndent} from '../Actions/Indent';
import {ActionMode} from '../Actions/Mode';

export class ModeNormal extends Mode {

    name = 'NORMAL';

    private maps: CommandMap[] = [
        { keys: 'h', command: ActionMoveCursor.characterLeft },
        { keys: '{N} h', command: ActionMoveCursor.characterLeft },
        { keys: 'l', command: ActionMoveCursor.characterRight },
        { keys: '{N} l', command: ActionMoveCursor.characterRight },
        { keys: 'k', command: ActionMoveCursor.characterUp },
        { keys: '{N} k', command: ActionMoveCursor.characterUp },
        { keys: 'j', command: ActionMoveCursor.characterDown },
        { keys: '{N} j', command: ActionMoveCursor.characterDown },

        { keys: 'w', command: ActionMoveCursor.wordNextStart },
        { keys: 'e', command: ActionMoveCursor.wordNextEnd },
        { keys: 'b', command: ActionMoveCursor.wordPrevStart },

        { keys: 'f {char}', command: ActionMoveCursor.matchCharacterNext },
        { keys: 'F {char}', command: ActionMoveCursor.matchCharacterPrev },

        { keys: '^', command: ActionMoveCursor.firstNonBlankInLine },
        { keys: '0', command: ActionMoveCursor.lineStart },
        { keys: '$', command: ActionMoveCursor.lineEnd },

        { keys: '-', command: ActionMoveCursor.firstNonBlankInLineUp },
        { keys: '{N} -', command: ActionMoveCursor.firstNonBlankInLineUp },
        { keys: '+', command: ActionMoveCursor.firstNonBlankInLineDown },
        { keys: '{N} +', command: ActionMoveCursor.firstNonBlankInLineDown },

        { keys: 'g g', command: ActionMoveCursor.documentStart },
        { keys: 'G', command: ActionMoveCursor.documentEnd },

        { keys: 'i', command: ActionMode.toInsert },
        { keys: 'a', command: () => ActionMoveCursor.characterRight().then(ActionMode.toInsert) },
        { keys: 'v', command: ActionMode.toVisual },
        { keys: 'ctrl+v', command: ActionMode.toVisualBlock },
        { keys: 'V', command: ActionMode.toVisualLine },

        { keys: 'o', command: () => ActionInsert.newLineAfter().then(ActionMode.toInsert) },
        { keys: 'O', command: () => ActionInsert.newLineBefore().then(ActionMode.toInsert) },

        { keys: 'X', command: () => ActionDelete.selectionsOrLeft().then(ActionSuggestion.hide) },
        { keys: 'x', command: () => ActionDelete.selectionsOrRight().then(ActionSuggestion.hide) },
        { keys: 'delete', command: () => ActionDelete.selectionsOrRight().then(ActionSuggestion.hide) },
        { keys: 'd d', command: ActionDelete.line },
        { keys: 'J', command: ActionJoinLines.onSelections },

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
