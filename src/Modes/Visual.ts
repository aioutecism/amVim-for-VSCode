import {commands} from 'vscode';
import {Configuration} from '../Configuration';
import {Mode, ModeID} from './Mode';
import {CommandMap} from '../Mappers/Command';
import {ActionMoveCursor} from '../Actions/MoveCursor';
import {ActionPage, PageMoveType} from '../Actions/Page';
import {ActionSelection} from '../Actions/Selection';
import {ActionSuggestion} from '../Actions/Suggestion';
import {ActionRegister} from '../Actions/Register';
import {ActionDelete} from '../Actions/Delete';
import {ActionInsert} from '../Actions/Insert';
import {ActionReplace} from '../Actions/Replace';
import {ActionIndent} from '../Actions/Indent';
import {ActionJoinLines} from '../Actions/JoinLines';
import {ActionFind} from '../Actions/Find';
import {ActionMode} from '../Actions/Mode';
import {MotionLine} from '../Motions/Line';

export class ModeVisual extends Mode {

    id = ModeID.VISUAL;
    name = 'VISUAL';

    private maps: CommandMap[] = [
        { keys: '{motion}', command: ActionMoveCursor.byMotions, args: {isVisualMode: true} },

        { keys: 'ctrl+b', command: ActionPage.up, args: {moveType: PageMoveType.Select} },
        { keys: 'ctrl+f', command: ActionPage.down, args: {moveType: PageMoveType.Select} },

        { keys: 'I', command: () => ActionSelection.shrinkToStarts().then(() => ActionMode.toInsert()) },
        { keys: 'A', command: () => ActionSelection.shrinkToEnds().then(() => ActionMode.toInsert()) },

        { keys: 'backspace', command: ActionDelete.selectionsOrRight, args: {shouldYank: true} },
        { keys: 'delete', command: ActionDelete.selectionsOrRight, args: {shouldYank: true} },
        { keys: 'x', command: ActionDelete.selectionsOrRight, args: {shouldYank: true} },
        { keys: 'X', command: ActionDelete.line, args: {shouldYank: true} },
        { keys: 'd', command: ActionDelete.selectionsOrRight, args: {shouldYank: true} },
        { keys: 'D', command: ActionDelete.line, args: {shouldYank: true} },
        { keys: 'c', command: () => ActionDelete.selectionsOrRight({shouldYank: true}).then(() => ActionMode.toInsert()) },
        { keys: 'C', command: () => ActionDelete.line({shouldYank: true}).then(() => ActionInsert.newLineBefore()).then(() => ActionMode.toInsert()) },
        { keys: 's', command: () => ActionDelete.selectionsOrRight({shouldYank: true}).then(() => ActionMode.toInsert()) },
        { keys: 'S', command: () => ActionDelete.line({shouldYank: true}).then(() => ActionInsert.newLineBefore()).then(() => ActionMode.toInsert()) },
        { keys: 'y', command: () => ActionRegister.yankSelections().then(() => ActionSelection.shrinkToStarts()) },
        { keys: 'J', command: () => ActionJoinLines.onSelections().then(() => ActionSelection.shrinkToActives()) },

        { keys: 'r {char}', command: ActionReplace.selections },

        { keys: '<', command: ActionIndent.decrease },
        { keys: '>', command: ActionIndent.increase },

        { keys: '/', command: ActionFind.focusFindWidget },

        { keys: 'V', command: ActionMode.toVisualLine },
        { keys: 'v', command: ActionSelection.shrinkToPrimaryActive },

        { keys: 'ctrl+c', command: () => ActionSuggestion.hide().then(() => ActionSelection.shrinkToPrimaryActive()) },
        { keys: 'escape', command: () => ActionSuggestion.hide().then(() => ActionSelection.shrinkToPrimaryActive()) },
    ];

    constructor() {
        super();

        this.maps.forEach(map => {
            this.mapper.map(map.keys, map.command, map.args);
        });
    }

    enter(): void {
        super.enter();

        ActionSelection.expandToOne();
    }

}
