import {RecursiveMap, MatchResultKind} from '../Generic';
import {SpecialKeyCommon, SpecialKeyMatchResult} from './Common';

export class SpecialKeyN implements SpecialKeyCommon {

    indicator = '{N}';

    private conflictRegExp = /^[1-9]|\{motion\}|\{textObject\}|\{char\}$/;

    unmapConflicts(node: RecursiveMap, keyToMap: string): void {
        if (keyToMap === this.indicator) {
            Object.getOwnPropertyNames(node).forEach(key => {
                this.conflictRegExp.test(key) && delete node[key];
            });
        }

        if (this.conflictRegExp.test(keyToMap)) {
            delete node[this.indicator];
        }
    }

    matchSpecial(inputs: string[]): SpecialKeyMatchResult | null {
        if (! /[1-9]/.test(inputs[0])) {
            return null;
        }

        let n = [inputs[0]];

        inputs.slice(1).every(input => {
            if (/[0-9]/.test(input)) {
                n.push(input);
                return true;
            }
            return false;
        });

        return {
            specialKey: this,
            kind: MatchResultKind.FOUND,
            matchedCount: n.length,
            additionalArgs: {n: parseInt(n.join(''), 10)}
        };
    }

}
