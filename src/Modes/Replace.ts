import { ModeInsert } from './Insert';
import { ModeID } from './Mode';
import { ActionReplace } from '../Actions/Replace';

export class ModeReplace extends ModeInsert {
    id = ModeID.REPLACE;
    name = 'REPLACE';

    constructor() {
        super(ActionReplace.textAtSelections);
    }
}
