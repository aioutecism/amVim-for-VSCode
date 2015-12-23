import {Command} from '../Modes/Mode';
import {RecursiveMap, Mapper, MatchResultType} from '../Mapper';
import {SpecialKeyCommon, SpecialKeyMatchResult} from './Common';
import {SpecialKeyN} from './N';
import {SpecialKeyChar} from './Char';

export class SpecialKeyMotion extends Mapper implements SpecialKeyCommon {

    indicator = '{motion}';

    constructor() {
        super([
            new SpecialKeyN(),
            new SpecialKeyChar(),
        ]);

        // TODO: Bind
    }

    map(joinedKeys: string, command: Command, args?: {}): void {
        const keys = joinedKeys.split(Mapper.saparator);

        if (keys.some(key => key === this.indicator)) {
            throw new Error(`${this.indicator} can't be mapped recursively.`);
            return;
        }

        super.map(joinedKeys, command, args);
    }

    unmapConflicts(node: RecursiveMap, keyToMap: string): void {
        delete node[this.indicator];

        if (keyToMap === this.indicator) {
            node = {};
        }
    }

    match(inputs: string[]): SpecialKeyMatchResult {
        const {type, map} = super.match(inputs);

        if (type === MatchResultType.FAILED) {
            return null;
        }

        return {
            specialKey: this,
            type,
            matchedCount: inputs.length,
            additionalArgs: {
                motion: map
            }
        };
    }

}
