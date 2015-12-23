import {RecursiveMap, MatchResultType} from '../GenericMapper';
import {SpecialKeyCommon, SpecialKeyMatchResult} from './Common';

export class SpecialKeyChar implements SpecialKeyCommon {

    indicator = '{char}';

    unmapConflicts(node: RecursiveMap, keyToMap: string): void {
        delete node[this.indicator];

        if (keyToMap === this.indicator) {
            node = {};
        }
    }

    match(inputs: string[]): SpecialKeyMatchResult {
        let character = inputs[0];

        if (character === 'space') {
            character = ' ';
        }

        return {
            specialKey: this,
            type: MatchResultType.FOUND,
            matchedCount: 1,
            additionalArgs: {character}
        };
    }

}
