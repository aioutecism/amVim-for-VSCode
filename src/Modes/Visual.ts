import {Mode, ModeID} from './Mode';
import {CommandMap} from '../Mappers/Command';
import {ActionMoveCursor} from '../Actions/MoveCursor';
import {ActionSelection} from '../Actions/Selection';
import {ActionMode} from '../Actions/Mode';

export class ModeVisual extends Mode {

    id = ModeID.VISUAL;
    name = 'VISUAL';

    private maps: CommandMap[] = [
        { keys: '{motion}', command: ActionMoveCursor.byMotions, args: {isVisualMode: true} },

        { keys: 'I', command: () => ActionSelection.shrinkToStarts().then(ActionMode.toInsert) },
        { keys: 'A', command: () => ActionSelection.shrinkToEnds().then(ActionMode.toInsert) },

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
