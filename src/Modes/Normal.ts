import {window, Disposable} from 'vscode';
import {Mode, ModeID} from './Mode';
import {CommandMap} from '../Mappers/Command';
import {ActionDecorate} from '../Actions/Decorate';
import {ActionMoveCursor} from '../Actions/MoveCursor';
import {ActionInsert} from '../Actions/Insert';
import {ActionDelete} from '../Actions/Delete';
import {ActionReplace} from '../Actions/Replace';
import {ActionRegister} from '../Actions/Register';
import {ActionSuggestion} from '../Actions/Suggestion';
import {ActionJoinLines} from '../Actions/JoinLines';
import {ActionFind} from '../Actions/Find';
import {ActionHistory} from '../Actions/History';
import {ActionIndent} from '../Actions/Indent';
import {ActionMode} from '../Actions/Mode';
import {Motion} from '../Motions/Motion';
import {MotionCharacter} from '../Motions/Character';
import {MotionLine} from '../Motions/Line';

export class ModeNormal extends Mode {

    id = ModeID.NORMAL;
    name = 'NORMAL';

    private maps: CommandMap[] = [
        { keys: '{motion}', command: ActionMoveCursor.byMotions },

        { keys: 'i', command: ActionMode.toInsert },
        { keys: 'I', command: () => ActionMoveCursor.byMotions({motions: [MotionLine.firstNonBlank()]}).then(ActionMode.toInsert) },
        { keys: 'a', command: () => ActionMoveCursor.byMotions({motions: [MotionCharacter.right()]}).then(ActionMode.toInsert) },
        { keys: 'A', command: () => ActionMoveCursor.byMotions({motions: [MotionLine.end()]}).then(ActionMode.toInsert) },

        { keys: 'o', command: () => ActionInsert.newLineAfter().then(ActionMode.toInsert) },
        { keys: 'O', command: () => ActionInsert.newLineBefore().then(ActionMode.toInsert) },

        { keys: 's', command: () => ActionDelete.selectionsOrRight().then(ActionMode.toInsert) },

        { keys: 'X', command: () => ActionDelete.selectionsOrLeft().then(ActionSuggestion.hide) },
        { keys: 'x', command: () => ActionDelete.selectionsOrRight().then(ActionSuggestion.hide) },
        { keys: 'delete', command: () => ActionDelete.selectionsOrRight().then(ActionSuggestion.hide) },
        { keys: 'd d', command: ActionDelete.line },
        { keys: 'D', command: () => ActionDelete.byMotions({motions: [MotionLine.end()]}) },
        { keys: 'd {motion}', command: ActionDelete.byMotions },
        { keys: 'C', command: () => ActionDelete.byMotions({motions: [MotionLine.end()]}).then(ActionMode.toInsert) },
        { keys: 'c c', command: () => {
            return ActionMoveCursor.byMotions({motions: [MotionLine.firstNonBlank()]})
                .then(ActionDelete.byMotions.bind(undefined, {motions: [MotionLine.end()]}))
                .then(ActionMode.toInsert);
        } },
        { keys: 'S', command: () => {
            return ActionMoveCursor.byMotions({motions: [MotionLine.firstNonBlank()]})
                .then(ActionDelete.byMotions.bind(undefined, {motions: [MotionLine.end()]}))
                .then(ActionMode.toInsert);
        } },
        { keys: 'c {motion}', command: (args: {motions: Motion[]}) => ActionDelete.byMotions(args).then(ActionMode.toInsert) },
        { keys: 'J', command: ActionJoinLines.onSelections },

        { keys: 'r {char}', command: ActionReplace.characters },

        { keys: 'y y', command: ActionRegister.yankLine },
        { keys: 'Y', command: ActionRegister.yankLine },
        { keys: 'y {motion}', command: ActionRegister.yankByMotions },
        { keys: 'p', command: ActionRegister.putAfter },
        { keys: 'P', command: ActionRegister.putBefore },

        { keys: 'n', command: ActionFind.next },
        { keys: 'N', command: ActionFind.prev },
        { keys: '*', command: () => ActionFind.byIndicator().then(ActionFind.next) },
        { keys: '#', command: () => ActionFind.byIndicator().then(ActionFind.prev) },

        { keys: 'u', command: ActionHistory.undo },
        { keys: 'ctrl+r', command: ActionHistory.redo },

        { keys: '< <', command: ActionIndent.decrease },
        { keys: '> >', command: ActionIndent.increase },

        { keys: 'v', command: ActionMode.toVisual },
        { keys: 'V', command: ActionMode.toVisualLine },
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
            // TODO: Cursor souldn't on linebreak.
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
