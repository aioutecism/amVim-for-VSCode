import {GenericMapper, GenericMap, RecursiveMap, MatchResultType} from '../Generic';
import {SpecialKeyCommon, SpecialKeyMatchResult} from './Common';
import {SpecialKeyN} from './N';
import {SpecialKeyChar} from './Char';
import {Motion} from '../../Motions/Motion';
import {MotionCharacter} from '../../Motions/Character';

interface MotionMap extends GenericMap {
    motionGenerator(args?: {}): Motion;
}

export class SpecialKeyMotion extends GenericMapper implements SpecialKeyCommon {

    indicator = '{motion}';

    private conflictRegExp = /^[1-9]|\{N\}|\{char\}$/;

    private maps: MotionMap[] = [
        { keys: 'h', motionGenerator: () => (new MotionCharacter()).left() },
        { keys: '{N} h', motionGenerator: (args: {n: number}) => (new MotionCharacter()).left(args.n) },
        { keys: 'l', motionGenerator: () => (new MotionCharacter()).right() },
        { keys: '{N} l', motionGenerator: (args: {n: number}) => (new MotionCharacter()).right(args.n) },
        { keys: 'k', motionGenerator: () => (new MotionCharacter()).up() },
        { keys: '{N} k', motionGenerator: (args: {n: number}) => (new MotionCharacter()).up(args.n) },
        { keys: 'j', motionGenerator: () => (new MotionCharacter()).down() },
        { keys: '{N} j', motionGenerator: (args: {n: number}) => (new MotionCharacter()).down(args.n) },
    ];

    constructor() {
        super([
            new SpecialKeyN(),
            new SpecialKeyChar(),
        ]);

        this.maps.forEach(map => {
            this.map(map.keys, map.motionGenerator, map.args);
        });
    }

    map(joinedKeys: string, motionGenerator: (args?: {}) => Motion, args?: {}): void {
        const map = super._map(joinedKeys, args);
        (map as MotionMap).motionGenerator = motionGenerator;
    }

    unmapConflicts(node: RecursiveMap, keyToMap: string): void {
        if (keyToMap === this.indicator) {
            Object.getOwnPropertyNames(node).forEach(key => {
                this.conflictRegExp.test(key) && delete node[key];
            });
        }

        if (this.conflictRegExp.test(keyToMap)) {
            delete node[this.indicator];
        }

        // This class has lower priority than other keys.
    }

    match(inputs: string[]): SpecialKeyMatchResult {
        const {type, map} = super._match(inputs);

        if (type === MatchResultType.FAILED) {
            return null;
        }

        let additionalArgs: {motion?: Motion} = {};
        if (map) {
            additionalArgs.motion = (map as MotionMap).motionGenerator(map.args);
        }

        return {
            specialKey: this,
            type,
            matchedCount: inputs.length,
            additionalArgs
        };
    }

}
