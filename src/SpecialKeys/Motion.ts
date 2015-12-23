import {Command} from '../Modes/Mode';
import {RecursiveMap} from '../Mapper';
import {SpecialKeyCommon} from './Common';

export class SpecialKeyMotion implements SpecialKeyCommon {

    indicator = '{motion}';

    unmapConflicts(node: RecursiveMap, keyToMap: string): void {
        delete node[this.indicator];

        if (keyToMap === this.indicator) {
            node = {};
        }
    }

}
