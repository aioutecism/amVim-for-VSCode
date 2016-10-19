import {Mode, ModeID} from './Mode';
import {CommandMap} from '../Mappers/Command';
import {ActionMoveCursor} from '../Actions/MoveCursor';
import {ActionPage, PageMoveType} from '../Actions/Page';
import {ActionSelection} from '../Actions/Selection';
import {ActionRegister} from '../Actions/Register';
import {ActionDelete} from '../Actions/Delete';
import {ActionInsert} from '../Actions/Insert';
import {ActionReplace} from '../Actions/Replace';
import {ActionCase} from '../Actions/Case';
import {ActionJoinLines} from '../Actions/JoinLines';
import {ActionFilter} from '../Actions/Filter';
import {ActionFind} from '../Actions/Find';
import {ActionMode} from '../Actions/Mode';
import {ActionIndent} from '../Actions/Indent';
import {ActionFold} from '../Actions/Fold';

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

        { keys: 'backspace', actions: [ActionDelete.byLines], args: {shouldYank: true} },
        { keys: 'delete', actions: [ActionDelete.byLines], args: {shouldYank: true} },
        { keys: 'x', actions: [ActionDelete.byLines], args: {shouldYank: true} },
        { keys: 'X', actions: [ActionDelete.byLines], args: {shouldYank: true} },
        { keys: 'd', actions: [ActionDelete.byLines], args: {shouldYank: true} },
        { keys: 'D', actions: [ActionDelete.byLines], args: {shouldYank: true} },
        { keys: 'c', actions: [
            ActionDelete.byLines,
            ActionInsert.newLineBefore,
            ActionMode.toInsert,
        ], args: {shouldYank: true} },
        { keys: 'C', actions: [
            ActionDelete.byLines,
            ActionInsert.newLineBefore,
            ActionMode.toInsert,
        ], args: {shouldYank: true} },
        { keys: 's', actions: [
            ActionDelete.byLines,
            ActionInsert.newLineBefore,
            ActionMode.toInsert,
        ], args: {shouldYank: true} },
        { keys: 'S', actions: [
            ActionDelete.byLines,
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

        { keys: 'p', actions: [ActionReplace.selectionsWithRegister], args: {shouldYank: true} },
        { keys: 'P', actions: [ActionReplace.selectionsWithRegister], args: {shouldYank: true} },

        { keys: 'r {char}', actions: [ActionReplace.selectionsWithCharacter] },
        { keys: '~', actions: [ActionCase.switchSelections] },

        { keys: '=', actions: [ActionFilter.Format.bySelections] },

        { keys: '<', actions: [ActionIndent.decrease] },
        { keys: '>', actions: [ActionIndent.increase] },

        { keys: '/', actions: [ActionFind.focusFindWidget] },

        { keys: 'v', actions: [ActionMode.toVisual] },
        { keys: 'V', actions: [ActionSelection.shrinkToActives] },

        { keys: 'z c', actions: [ActionFold.fold]},
        { keys: 'z o', actions: [ActionFold.unfold]},
        { keys: 'z M', actions: [ActionFold.foldAll]},
        { keys: 'z R', actions: [ActionFold.unfoldAll]},

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

        ActionSelection.expandToLine();
    }

}
