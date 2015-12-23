import {Command} from '../Modes/Mode';
import {RecursiveMap, Mapper, MatchResultType} from '../Mapper';
import {SpecialKeyCommon} from './Common';

export class SpecialKeyMotion implements SpecialKeyCommon {

    indicator = '{motion}';

    unmapConflicts(node: RecursiveMap, keyToMap: string): void {
        delete node[this.indicator];

        if (keyToMap === this.indicator) {
            node = {};
        }
    }

    match(inputs: string[]): {type: MatchResultType, matchedCount?: number, additionalArgs? : {}} {
        // TODO: Implement this
        return null;
    }

}
