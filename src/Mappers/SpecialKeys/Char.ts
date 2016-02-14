import {RecursiveMap, MatchResultKind} from '../Generic';
import {SpecialKeyCommon, SpecialKeyMatchResult} from './Common';

export class SpecialKeyChar implements SpecialKeyCommon {

    indicator = '{char}';

    unmapConflicts(node: RecursiveMap, keyToMap: string): void {
        delete node[this.indicator];

        if (keyToMap === this.indicator) {
            node = {};
        }
    }

    matchSpecial(inputs: string[]): SpecialKeyMatchResult {
        let character = inputs[0];

        if (character === 'space') {
            character = ' ';
        }

        return {
            specialKey: this,
            kind: MatchResultKind.FOUND,
            matchedCount: 1,
            additionalArgs: {character}
        };
    }

}
