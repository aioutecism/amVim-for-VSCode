import {Mode} from './Mode';
import {CommandMap} from '../Mappers/Command';
import {ActionMode} from '../Actions/Mode';

export class ModeVisualLine extends Mode {

    name = 'VISUAL LINE';

    private maps: CommandMap[] = [
        { keys: 'escape', command: ActionMode.toNormal },
    ];

    constructor() {
        super();

        this.maps.forEach(map => {
            this.mapper.map(map.keys, map.command, map.args);
        });
    }

}
