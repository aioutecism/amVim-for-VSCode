import {Mode} from './Mode';
import {CommandMap} from '../CommandMapper';
import {ActionMode} from '../Actions/Mode';

export class ModeVisualBlock extends Mode {

    name = 'VISUAL BLOCK';

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
