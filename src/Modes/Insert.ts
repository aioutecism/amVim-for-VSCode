import {Configuration} from '../Configuration';
import {Mode, ModeID} from './Mode';
import * as Keys from '../Keys';
import {MatchResultKind} from '../Mappers/Generic';
import {CommandMap} from '../Mappers/Command';
import {ActionInsert} from '../Actions/Insert';
import {ActionReplace} from '../Actions/Replace';
import {ActionDelete} from '../Actions/Delete';
import {ActionSelection} from '../Actions/Selection';
import {ActionMode} from '../Actions/Mode';
import {MotionWord} from '../Motions/Word';
import {MotionLine} from '../Motions/Line';

export class ModeInsert extends Mode {

    id = ModeID.INSERT;
    name = 'INSERT';

    private maps: CommandMap[] = [
        { keys: 'ctrl+w', actions: [() => ActionDelete.byMotions({motions: [MotionWord.prevStart()]})] },
        { keys: 'ctrl+u', actions: [() => ActionDelete.byMotions({motions: [MotionLine.firstNonBlank()]})] },

        { keys: 'ctrl+c', actions: [() => ActionSelection.shrinkAStep()
            .then(isShrinked => isShrinked ? Promise.resolve(true) : ActionMode.toNormal())] },
        { keys: 'ctrl+[', actions: [() => ActionSelection.shrinkAStep()
            .then(isShrinked => isShrinked ? Promise.resolve(true) : ActionMode.toNormal())] },
        { keys: 'escape', actions: [() => ActionSelection.shrinkAStep()
            .then(isShrinked => isShrinked ? Promise.resolve(true) : ActionMode.toNormal())] },
    ];

    constructor() {
        super();

        this.maps.forEach(map => {
            this.mapper.map(map.keys, map.actions, map.args);
        });
    }

    enter(): void {
      super.enter();

      this.startRecord();
    }

    exit(): void {
        super.exit();

        this.stopRecord();
    }

    input(key: string, args: {replaceCharCnt?: number} = {}): MatchResultKind {
        const matchResultKind = super.input(key);

        // Pass key to built-in command if match failed.
        if (matchResultKind !== MatchResultKind.FAILED) {
            return matchResultKind;
        }

        this.pushCommandMap({
            keys: key,
            actions: [ ActionInsert.characterAtSelections ],
            args: {
                character: key,
                replaceCharCnt: args.replaceCharCnt,
            }
        });
        this.execute();

        return MatchResultKind.FOUND;
    }

    private shouldRecord: boolean = false;
    private _recordedCommandMaps: CommandMap[];
    get recordedCommandMaps() { return this._recordedCommandMaps; }

    private startRecord(): void {
        this.shouldRecord = true;
        this._recordedCommandMaps = [];
    }

    private stopRecord(): void {
        this.shouldRecord = false;
    }

    // TODO: Deletion and autocomplete is not tracked now.
    protected onWillCommandMapMakesChanges(map: CommandMap): void {
        if (this.shouldRecord) {
            this._recordedCommandMaps.push(map);
        }
    }

}
