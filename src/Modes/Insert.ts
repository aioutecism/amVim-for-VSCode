import {Mode} from './Mode';
import * as Keys from '../Keys';
import {Map} from '../Mapper';
import {ActionInsert} from '../Actions/Insert';
import {ActionMode} from '../Actions/Mode';

export class ModeInsert extends Mode {

    name = 'INSERT';

    private maps: Map[] = [
        { keys: 'escape', command: ActionMode.toNormal },
    ].concat(Keys.characters.map(key => {
        return { keys: key, command: () => {
            return ActionInsert.characterAtSelections({character: key});
        } };
    }));

    constructor() {
        super();

        this.maps.forEach(map => {
            this.mapper.map(map.keys, map.command, map.args);
        });
    }

}
