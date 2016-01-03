import {Mode, ModeID} from './Mode';
import {CommandMap} from '../Mappers/Command';
import {ActionMoveCursor} from '../Actions/MoveCursor';
import {ActionSelection} from '../Actions/Selection';
import {ActionRegister} from '../Actions/Register';
import {ActionDelete} from '../Actions/Delete';
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

        { keys: 'backspace', command: ActionDelete.selectionsOrRight },
        { keys: 'delete', command: ActionDelete.selectionsOrRight },
        { keys: 'x', command: ActionDelete.selectionsOrRight },
        { keys: 'X', command: ActionDelete.line },
        { keys: 'd', command: ActionDelete.selectionsOrRight },
        { keys: 'D', command: ActionDelete.line },
        { keys: 'c', command: () => ActionDelete.selectionsOrRight().then(ActionMode.toInsert) },
        { keys: 'C', command: () => ActionSelection.shrinkToStarts()
            .then(ActionDelete.byMotions.bind(undefined, {motions: [MotionLine.end()]}))
            .then(ActionMode.toInsert) },
        { keys: 'y', command: () => ActionRegister.yankSelections().then(ActionSelection.shrinkToStarts) },
        { keys: 'J', command: () => ActionJoinLines.onSelections().then(ActionSelection.shrinkToActives) },

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
