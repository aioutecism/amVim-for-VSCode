import {Mode} from './Mode';
import * as Keys from '../Keys';
import {Map} from '../Mapper';
import {ActionInsert} from '../Actions/Insert';
import {ActionDelete} from '../Actions/Delete';
import {ActionMode} from '../Actions/Mode';

export class ModeInsert extends Mode {

    name = 'INSERT';

    private maps: Map[] = [
        { keys: 'space', command: ActionInsert.characterAtSelections, args: { character: ' ' } },
        { keys: 'enter', command: ActionInsert.lineBreakAtSelections },
        { keys: 'tab', command: ActionInsert.tabAtSelections },
        { keys: 'backspace', command: ActionDelete.selectionsOrLeft },
        { keys: 'delete', command: ActionDelete.selectionsOrRight },

        { keys: 'escape', command: ActionMode.toNormal },
    ]
        .concat(Keys.characters.map(key => {
            return { keys: key, command: ActionInsert.characterAtSelections, args: { character: key } };
        }));

    constructor() {
        super();

        this.maps.forEach(map => {
            this.mapper.map(map.keys, map.command, map.args);
        });
    }

}
