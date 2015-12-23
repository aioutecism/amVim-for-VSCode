import {Command} from './Modes/Mode';
import {RecursiveMap} from './Mapper';

export interface Common {
    indicator: string;

    unmapConflicts(node: RecursiveMap, keyToMap: string): void;

    // map(joinedKeys: string, command: Command, args?: {}): void;

    // match(inputs: string[], root: Map): {} | boolean;
}

export class N implements Common {
    indicator = '{N}';

    private conflictRegExp = /^[1-9]|\{motion\}|\{char\}$/;

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
}

export class Char implements Common {
    indicator = '{char}';

    unmapConflicts(node: RecursiveMap, keyToMap: string): void {
        delete node[this.indicator];

        if (keyToMap === this.indicator) {
            node = {};
        }
    }
}

export class Motion implements Common {
    indicator = '{motion}';

    unmapConflicts(node: RecursiveMap, keyToMap: string): void {
        delete node[this.indicator];

        if (keyToMap === this.indicator) {
            node = {};
        }
    }
}
