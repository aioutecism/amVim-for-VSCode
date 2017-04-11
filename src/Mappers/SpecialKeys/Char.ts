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

    matchSpecial(
        inputs: string[],
        additionalArgs: {[key: string]: any},
        lastSpecialKeyMatch?: SpecialKeyMatchResult,
    ): SpecialKeyMatchResult | null {
        let character = inputs[0];

        if (character === 'space') {
            character = ' ';
        }

        additionalArgs.character = character;

        return {
            specialKey: this,
            kind: MatchResultKind.FOUND,
            matchedCount: 1,
        };
    }

}
