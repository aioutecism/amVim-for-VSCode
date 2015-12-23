import {Mode} from './Mode';
import {CommandMap} from '../CommandMapper';
import {ActionMode} from '../Actions/Mode';

export class ModeVisual extends Mode {

    name = 'VISUAL';

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
