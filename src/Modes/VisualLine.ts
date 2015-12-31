import {Mode, ModeID} from './Mode';
import {CommandMap} from '../Mappers/Command';
import {ActionSelection} from '../Actions/Selection';

export class ModeVisualLine extends Mode {

    id = ModeID.VISUAL_LINE;
    name = 'VISUAL LINE';

    private maps: CommandMap[] = [
        { keys: 'escape', command: ActionSelection.shrinkAStep },
    ];

    constructor() {
        super();

        this.maps.forEach(map => {
            this.mapper.map(map.keys, map.command, map.args);
        });
    }

}
