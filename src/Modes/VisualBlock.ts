import {Mode, ModeID} from './Mode';
import {CommandMap} from '../Mappers/Command';
import {ActionSelection} from '../Actions/Selection';
import {ActionMode} from '../Actions/Mode';

export class ModeVisualBlock extends Mode {

    id = ModeID.VISUAL_BLOCK;
    name = 'VISUAL BLOCK';

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
