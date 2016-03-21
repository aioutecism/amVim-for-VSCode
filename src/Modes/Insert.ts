import {Configuration} from '../Configuration';
import {Mode, ModeID} from './Mode';
import * as Keys from '../Keys';
import {MatchResultKind} from '../Mappers/Generic';
import {CommandMap} from '../Mappers/Command';
import {ActionInsert} from '../Actions/Insert';
import {ActionReplace} from '../Actions/Replace';
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
        { keys: 'ctrl+w', command: () => ActionDelete.byMotions({motions: [MotionWord.prevStart()]}) },
        { keys: 'ctrl+u', command: () => ActionDelete.byMotions({motions: [MotionLine.firstNonBlank()]}) },

        { keys: 'ctrl+c', command: () => ActionSuggestion.hide()
            .then(() => ActionSelection.shrinkAStep())
            .then((isShrinked) => {
                return isShrinked ? Promise.resolve(true) : ActionMode.toNormal();
            })
        },
        { keys: 'escape', command: () => ActionSuggestion.hide()
            .then(() => ActionSelection.shrinkAStep())
            .then((isShrinked) => {
                return isShrinked ? Promise.resolve(true) : ActionMode.toNormal();
            })
        },
    ];

    constructor() {
        super();

        this.maps.forEach(map => {
            this.mapper.map(map.keys, map.command, map.args);
        });
    }

    input(key: string, args: {replaceCharCnt?: number} = {}): MatchResultKind {
        const matchResultKind = super.input(key);

        // Pass key to built-in command if match failed.
        if (matchResultKind !== MatchResultKind.FAILED) {
            return matchResultKind;
        }

        if (args.replaceCharCnt && args.replaceCharCnt > 0) {
            this.pushCommand(() => {
                return ActionReplace.characters({
                    character: key,
                    n: -args.replaceCharCnt
                });
            });
        }
        else {
            this.pushCommand(() => {
                return ActionInsert.characterAtSelections({character: key});
            });
        }
        this.execute();

        return MatchResultKind.FOUND;
    }

}
