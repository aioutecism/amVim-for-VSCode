import {Mode, ModeID} from './Mode';
import {CommandMap} from '../Mappers/Command';
import {ActionMoveCursor} from '../Actions/MoveCursor';
import {ActionSelection} from '../Actions/Selection';
import {ActionRegister} from '../Actions/Register';
import {ActionDelete} from '../Actions/Delete';
import {ActionJoinLines} from '../Actions/JoinLines';
import {ActionMode} from '../Actions/Mode';
import {MotionLine} from '../Motions/Line';

export class ModeVisual extends Mode {

    id = ModeID.VISUAL;
    name = 'VISUAL';

    private maps: CommandMap[] = [
        { keys: '{motion}', command: ActionMoveCursor.byMotions, args: {isVisualMode: true} },

        { keys: 'I', command: () => ActionSelection.shrinkToStarts().then(ActionMode.toInsert) },
        { keys: 'A', command: () => ActionSelection.shrinkToEnds().then(ActionMode.toInsert) },

        { keys: 'd', command: ActionDelete.selectionsOrRight },
        { keys: 'c', command: () => ActionDelete.selectionsOrRight().then(ActionMode.toInsert) },
        { keys: 'C', command: () => ActionSelection.shrinkToStarts()
            .then(ActionDelete.byMotions.bind(undefined, {motions: [MotionLine.end()]}))
            .then(ActionMode.toInsert) },
        { keys: 'y', command: () => ActionRegister.yankSelections().then(ActionSelection.shrinkToStarts) },
        { keys: 'J', command: () => ActionJoinLines.onSelections().then(ActionSelection.shrinkToActives) },

        { keys: 'escape', command: ActionSelection.shrinkAStep },
    ];

    constructor() {
        super();

        this.maps.forEach(map => {
            this.mapper.map(map.keys, map.command, map.args);
        });
    }

    enter(): void {
        super.enter();

        ActionSelection.expandEmptiesToOne();
    }

}
