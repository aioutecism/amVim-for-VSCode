import {Mode, ModeID} from './Mode';
import {CommandMap} from '../Mappers/Command';
import {ActionMoveCursor} from '../Actions/MoveCursor';
import {ActionPage, PageMoveType} from '../Actions/Page';
import {ActionSelection} from '../Actions/Selection';
import {ActionRegister} from '../Actions/Register';
import {ActionDelete} from '../Actions/Delete';
import {ActionInsert} from '../Actions/Insert';
import {ActionCase} from '../Actions/Case';
import {ActionReplace} from '../Actions/Replace';
import {ActionIndent} from '../Actions/Indent';
import {ActionJoinLines} from '../Actions/JoinLines';
import {ActionFilter} from '../Actions/Filter';
import {ActionFind} from '../Actions/Find';
import {ActionMode} from '../Actions/Mode';

export class ModeVisual extends Mode {

    id = ModeID.VISUAL;
    name = 'VISUAL';

    private maps: CommandMap[] = [
        { keys: '{motion}', actions: [ActionMoveCursor.byMotions], args: {isVisualMode: true} },
        { keys: '{textObject}', actions: [ActionSelection.expandByTextObject]},

        { keys: 'ctrl+b', actions: [ActionPage.up], args: {moveType: PageMoveType.Select} },
        { keys: 'ctrl+f', actions: [ActionPage.down], args: {moveType: PageMoveType.Select} },

        { keys: 'I', actions: [
            ActionSelection.shrinkToStarts,
            ActionMode.toInsert,
        ] },
        { keys: 'A', actions: [
            ActionSelection.shrinkToEnds,
            ActionMode.toInsert,
        ] },

        { keys: 'backspace', actions: [ActionDelete.selectionsOrRight], args: {shouldYank: true} },
        { keys: 'delete', actions: [ActionDelete.selectionsOrRight], args: {shouldYank: true} },
        { keys: 'x', actions: [ActionDelete.selectionsOrRight], args: {shouldYank: true} },
        { keys: 'X', actions: [ActionDelete.byLines], args: {shouldYank: true} },
        { keys: 'd', actions: [ActionDelete.selectionsOrRight], args: {shouldYank: true} },
        { keys: 'D', actions: [ActionDelete.byLines], args: {shouldYank: true} },
        { keys: 'c', actions: [
            ActionDelete.selectionsOrRight,
            ActionMode.toInsert,
        ], args: {shouldYank: true} },
        { keys: 'C', actions: [
            ActionDelete.byLines,
            ActionInsert.newLineBefore,
            ActionMode.toInsert,
        ], args: {shouldYank: true} },
        { keys: 's', actions: [
            ActionDelete.selectionsOrRight,
            ActionMode.toInsert,
        ], args: {shouldYank: true} },
        { keys: 'S', actions: [
            ActionDelete.byLines,
            ActionInsert.newLineBefore,
            ActionMode.toInsert,
        ], args: {shouldYank: true} },
        { keys: 'y', actions: [
            ActionRegister.yankSelections,
            ActionSelection.shrinkToStarts,
        ] },
        { keys: 'J', actions: [
            ActionJoinLines.onSelections,
            ActionSelection.shrinkToActives,
        ] },

        { keys: 'r {char}', actions: [ActionReplace.selectionsWithCharacter] },
        { keys: '~', actions: [ActionCase.switchSelections] },

        { keys: '=', actions: [ActionFilter.Format.bySelections] },

        { keys: '<', actions: [ActionIndent.decrease] },
        { keys: '>', actions: [ActionIndent.increase] },

        { keys: '/', actions: [ActionFind.focusFindWidget] },

        { keys: 'V', actions: [ActionMode.toVisualLine] },
        { keys: 'v', actions: [ActionSelection.shrinkToActives] },

        { keys: 'ctrl+c', actions: [ActionSelection.shrinkToActives] },
        { keys: 'ctrl+[', actions: [ActionSelection.shrinkToActives] },
        { keys: 'escape', actions: [ActionSelection.shrinkToActives] },
    ];

    constructor() {
        super();

        this.maps.forEach(map => {
            this.mapper.map(map.keys, map.actions, map.args);
        });
    }

    enter(): void {
        super.enter();

        ActionSelection.expandToOne();
    }

}
