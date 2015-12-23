import {RecursiveMap, MatchResultType} from '../Mapper';
import {SpecialKeyCommon} from './Common';

export class SpecialKeyChar implements SpecialKeyCommon {

    indicator = '{char}';

    unmapConflicts(node: RecursiveMap, keyToMap: string): void {
        delete node[this.indicator];

        if (keyToMap === this.indicator) {
            node = {};
        }
    }

    match(inputs: string[]): {type: MatchResultType, matchedCount?: number, additionalArgs? : {}} {
        let character = inputs[0];

        if (character === 'space') {
            character = ' ';
        }

        return {
            type: MatchResultType.FOUND,
            matchedCount: 1,
            additionalArgs: {character}
        };
    }

}
