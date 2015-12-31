import {Mode} from './Mode';
import {CommandMap} from '../Mappers/Command';
import {ActionSelection} from '../Actions/Selection';
import {ActionMode} from '../Actions/Mode';

export class ModeVisual extends Mode {

    name = 'VISUAL';

    private maps: CommandMap[] = [
        { keys: 'escape', command: () => ActionSelection.shrinkAStep().then((isShrinked) => {
            return isShrinked ? Promise.resolve(true) : ActionMode.toNormal();
        }) },
    ];

    constructor() {
        super();

        this.maps.forEach(map => {
            this.mapper.map(map.keys, map.command, map.args);
        });
    }

}
