import {commands} from 'vscode';
import {Configuration} from '../Configuration';
import {Mode, ModeID} from './Mode';
import {CommandMap} from '../Mappers/Command';
import {ActionMoveCursor} from '../Actions/MoveCursor';
import {ActionPage, PageMoveType} from '../Actions/Page';
import {ActionSelection} from '../Actions/Selection';
import {ActionRegister} from '../Actions/Register';
import {ActionDelete} from '../Actions/Delete';
import {ActionInsert} from '../Actions/Insert';
import {ActionReplace} from '../Actions/Replace';
import {ActionJoinLines} from '../Actions/JoinLines';
import {ActionFilter} from '../Actions/Filter';
import {ActionFind} from '../Actions/Find';
import {ActionMode} from '../Actions/Mode';
import {ActionIndent} from '../Actions/Indent';
import {MotionLine} from '../Motions/Line';

export class ModeVisualLine extends Mode {

    id = ModeID.VISUAL_LINE;
    name = 'VISUAL LINE';

    private maps: CommandMap[] = [
        { keys: '{motion}', actions: [ActionMoveCursor.byMotions], args: {isVisualLineMode: true} },

        { keys: 'ctrl+b', actions: [ActionPage.up], args: {moveType: PageMoveType.SelectLine} },
        { keys: 'ctrl+f', actions: [ActionPage.down], args: {moveType: PageMoveType.SelectLine} },

        { keys: 'I', actions: [
            ActionSelection.shrinkToStarts,
            ActionMode.toInsert
        ] },
        { keys: 'A', actions: [
            ActionSelection.shrinkToEnds,
            ActionMode.toInsert
        ] },

        { keys: 'backspace', actions: [ActionDelete.line], args: {shouldYank: true} },
        { keys: 'delete', actions: [ActionDelete.line], args: {shouldYank: true} },
        { keys: 'x', actions: [ActionDelete.line], args: {shouldYank: true} },
        { keys: 'X', actions: [ActionDelete.line], args: {shouldYank: true} },
        { keys: 'd', actions: [ActionDelete.line], args: {shouldYank: true} },
        { keys: 'D', actions: [ActionDelete.line], args: {shouldYank: true} },
        { keys: 'c', actions: [
            ActionDelete.line,
            ActionInsert.newLineBefore,
            ActionMode.toInsert,
        ], args: {shouldYank: true} },
        { keys: 'C', actions: [
            ActionDelete.line,
            ActionInsert.newLineBefore,
            ActionMode.toInsert,
        ], args: {shouldYank: true} },
        { keys: 's', actions: [
            ActionDelete.line,
            ActionInsert.newLineBefore,
            ActionMode.toInsert,
        ], args: {shouldYank: true} },
        { keys: 'S', actions: [
            ActionDelete.line,
            ActionInsert.newLineBefore,
            ActionMode.toInsert,
        ], args: {shouldYank: true} },
        { keys: 'y', actions: [
            ActionRegister.yankLines,
            ActionSelection.shrinkToStarts,
        ] },
        { keys: 'J', actions: [
            ActionJoinLines.onSelections,
            ActionSelection.shrinkToActives,
        ] },

        { keys: 'r {char}', actions: [ActionReplace.selections] },

        { keys: '=', actions: [ActionFilter.Format.bySelections] },

        { keys: '<', actions: [ActionIndent.decrease] },
        { keys: '>', actions: [ActionIndent.increase] },

        { keys: '/', actions: [ActionFind.focusFindWidget] },

        { keys: 'v', actions: [ActionMode.toVisual] },
        { keys: 'V', actions: [ActionSelection.shrinkToPrimaryActive] },

        { keys: 'ctrl+c', actions: [ActionSelection.shrinkToPrimaryActive] },
        { keys: 'ctrl+[', actions: [ActionSelection.shrinkToPrimaryActive] },
        { keys: 'escape', actions: [ActionSelection.shrinkToPrimaryActive] },
    ];

    constructor() {
        super();

        this.maps.forEach(map => {
            this.mapper.map(map.keys, map.actions, map.args);
        });
    }

    enter(): void {
        super.enter();

        ActionSelection.expandToLine();
    }

}
