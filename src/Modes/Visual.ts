import {Mode, ModeID} from './Mode';
import {CommandMap} from '../Mappers/Command';
import {ActionMoveCursor} from '../Actions/MoveCursor';
import {ActionSelection} from '../Actions/Selection';
import {ActionRegister} from '../Actions/Register';
import {ActionDelete} from '../Actions/Delete';
import {ActionReplace} from '../Actions/Replace';
import {ActionIndent} from '../Actions/Indent';
import {ActionJoinLines} from '../Actions/JoinLines';
import {ActionFind} from '../Actions/Find';
import {ActionMode} from '../Actions/Mode';
import {MotionLine} from '../Motions/Line';

export class ModeVisual extends Mode {

    id = ModeID.VISUAL;
    name = 'VISUAL';

    private maps: CommandMap[] = [
        { keys: '{motion}', command: ActionMoveCursor.byMotions, args: {isVisualMode: true} },

        { keys: 'I', command: () => ActionSelection.shrinkToStarts().then(ActionMode.toInsert) },
        { keys: 'A', command: () => ActionSelection.shrinkToEnds().then(ActionMode.toInsert) },

        { keys: 'backspace', command: ActionDelete.selectionsOrRight, args: {shouldYank: true} },
        { keys: 'delete', command: ActionDelete.selectionsOrRight, args: {shouldYank: true} },
        { keys: 'x', command: ActionDelete.selectionsOrRight, args: {shouldYank: true} },
        { keys: 'X', command: ActionDelete.line, args: {shouldYank: true} },
        { keys: 'd', command: ActionDelete.selectionsOrRight, args: {shouldYank: true} },
        { keys: 'D', command: ActionDelete.line, args: {shouldYank: true} },
        { keys: 'c', command: () => ActionDelete.selectionsOrRight({shouldYank: true}).then(ActionMode.toInsert) },
        { keys: 'C', command: () => ActionSelection.shrinkToStarts()
            .then(ActionDelete.byMotions.bind(undefined, {motions: [MotionLine.end()], shouldYank: true}))
            .then(ActionMode.toInsert) },
        { keys: 'y', command: () => ActionRegister.yankSelections().then(ActionSelection.shrinkToStarts) },
        { keys: 'J', command: () => ActionJoinLines.onSelections().then(ActionSelection.shrinkToActives) },

        { keys: 'r {char}', command: ActionReplace.selections },

        { keys: '< <', command: ActionIndent.decrease },
        { keys: '> >', command: ActionIndent.increase },

        { keys: '/', command: ActionFind.focusFindWidget },

        { keys: 'V', command: ActionMode.toVisualLine },
        { keys: 'v', command: ActionSelection.shrinkToPrimaryActive },

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

        ActionSelection.expandToOne();
    }

}
