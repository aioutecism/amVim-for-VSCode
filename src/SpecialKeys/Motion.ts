import {Motion} from '../Motions/Motion';
import {GenericMapper, GenericMap, RecursiveMap, MatchResultType} from '../GenericMapper';
import {SpecialKeyCommon, SpecialKeyMatchResult} from './Common';
import {SpecialKeyN} from './N';
import {SpecialKeyChar} from './Char';
import {MotionCharacter} from '../Motions/Character';

interface MotionMap extends GenericMap {
    motion: Motion;
}

export class SpecialKeyMotion extends GenericMapper implements SpecialKeyCommon {

    indicator = '{motion}';

    private maps: MotionMap[] = [
        { keys: 'h', motion: new MotionCharacter() },
        { keys: 'l', motion: new MotionCharacter() },
        { keys: 'k', motion: new MotionCharacter() },
        { keys: 'j', motion: new MotionCharacter() },
    ];

    constructor() {
        super([
            new SpecialKeyN(),
            new SpecialKeyChar(),
        ]);

        this.maps.forEach(map => {
            this.map(map.keys, map.motion, map.args);
        });
    }

    map(joinedKeys: string, motion: Motion, args?: {}): void {
        const map = super._map(joinedKeys, args);
        (map as MotionMap).motion = motion;
    }

    unmapConflicts(node: RecursiveMap, keyToMap: string): void {
        delete node[this.indicator];

        if (keyToMap === this.indicator) {
            node = {};
        }
    }

    match(inputs: string[]): SpecialKeyMatchResult {
        const {type, map} = super._match(inputs);

        if (type === MatchResultType.FAILED) {
            return null;
        }

        let additionalArgs: {motion?: Motion} = {};
        if (map) {
            additionalArgs.motion = (map as MotionMap).motion;
        }

        return {
            specialKey: this,
            type,
            matchedCount: inputs.length,
            additionalArgs
        };
    }

}
