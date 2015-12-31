import {Mode, ModeID} from './Mode';
import * as Keys from '../Keys';
import {CommandMap} from '../Mappers/Command';
import {ActionInsert} from '../Actions/Insert';
import {ActionDelete} from '../Actions/Delete';
import {ActionSuggestion} from '../Actions/Suggestion';
import {ActionSelection} from '../Actions/Selection';
import {ActionMode} from '../Actions/Mode';
import {MotionWord} from '../Motions/Word';
import {MotionLine} from '../Motions/Line';

export class ModeInsert extends Mode {

    id = ModeID.INSERT;
    name = 'INSERT';

    private maps: CommandMap[] = [
        { keys: 'space', command: ActionInsert.characterAtSelections, args: {character: ' '} },
        { keys: 'enter', command: ActionInsert.lineBreakAtSelections },
        { keys: 'tab', command: ActionInsert.tabAtSelections },
        { keys: 'backspace', command: ActionDelete.selectionsOrLeft },
        { keys: 'delete', command: ActionDelete.selectionsOrRight },

        { keys: 'ctrl+w', command: () => ActionDelete.byMotions({motions: [MotionWord.prevStart()]}) },
        { keys: 'ctrl+u', command: () => ActionDelete.byMotions({motions: [MotionLine.firstNonBlank()]}) },

        { keys: 'escape', command: () => ActionSelection.shrinkAStep().then((isShrinked) => {
            return isShrinked ? Promise.resolve(true) : ActionMode.toNormal();
        }) },
    ]
        .concat(Keys.characters.map(key => {
            return { keys: key, command: (args) => {
                return ActionInsert.characterAtSelections(args)
                    .then(ActionSuggestion.trigger);
            }, args: {character: key} };
        }));

    constructor() {
        super();

        this.maps.forEach(map => {
            this.mapper.map(map.keys, map.command, map.args);
        });
    }

}
