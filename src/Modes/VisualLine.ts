import {Mode, ModeID} from './Mode';
import {CommandMap} from '../Mappers/Command';
import {ActionMoveCursor} from '../Actions/MoveCursor';
import {ActionSelection} from '../Actions/Selection';
import {ActionRegister} from '../Actions/Register';
import {ActionDelete} from '../Actions/Delete';
import {ActionInsert} from '../Actions/Insert';
import {ActionReplace} from '../Actions/Replace';
import {ActionJoinLines} from '../Actions/JoinLines';
import {ActionMode} from '../Actions/Mode';
import {ActionIndent} from '../Actions/Indent';
import {MotionLine} from '../Motions/Line';

export class ModeVisualLine extends Mode {

    id = ModeID.VISUAL_LINE;
    name = 'VISUAL LINE';

    private maps: CommandMap[] = [
        { keys: '{motion}', command: ActionMoveCursor.byMotions, args: {isVisualLineMode: true} },

        { keys: 'I', command: () => ActionSelection.shrinkToStarts().then(ActionMode.toInsert) },
        { keys: 'A', command: () => ActionSelection.shrinkToEnds().then(ActionMode.toInsert) },

        { keys: 'backspace', command: ActionDelete.line },
        { keys: 'delete', command: ActionDelete.line },
        { keys: 'x', command: ActionDelete.line },
        { keys: 'X', command: ActionDelete.line },
        { keys: 'd', command: ActionDelete.line },
        { keys: 'D', command: ActionDelete.line },
        { keys: 'c', command: () => ActionDelete.line().then(ActionInsert.newLineBefore).then(ActionMode.toInsert) },
        { keys: 'C', command: () => ActionDelete.line().then(ActionInsert.newLineBefore).then(ActionMode.toInsert) },
        { keys: 'y', command: () => ActionRegister.yankSelections().then(ActionSelection.shrinkToStarts) },
        { keys: 'J', command: () => ActionJoinLines.onSelections().then(ActionSelection.shrinkToActives) },

        { keys: 'r {char}', command: ActionReplace.selections },

        { keys: '< <', command: ActionIndent.decrease },
        { keys: '> >', command: ActionIndent.increase },

        { keys: 'v', command: ActionMode.toVisual },
        { keys: 'V', command: ActionSelection.shrinkToPrimaryActive },

        { keys: 'escape', command: ActionSelection.shrinkToPrimaryActive },
    ];

    constructor() {
        super();

        this.maps.forEach(map => {
            this.mapper.map(map.keys, map.command, map.args);
        });
    }

    enter(): void {
        super.enter();

        ActionSelection.expandToLine();
    }

}
