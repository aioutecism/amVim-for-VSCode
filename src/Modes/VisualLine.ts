import {Mode, ModeID} from './Mode';
import {CommandMap} from '../Mappers/Command';
import {ActionMoveCursor} from '../Actions/MoveCursor';
import {ActionSelection} from '../Actions/Selection';

export class ModeVisualLine extends Mode {

    id = ModeID.VISUAL_LINE;
    name = 'VISUAL LINE';

    private maps: CommandMap[] = [
        { keys: '{motion}', command: ActionMoveCursor.byMotions, args: {isVisualLineMode: true} },

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
