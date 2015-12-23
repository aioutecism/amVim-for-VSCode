import {Command} from '../Modes/Mode';
import {RecursiveMap} from '../Mapper';
import {SpecialKeyCommon} from './Common';

export class SpecialKeyChar implements SpecialKeyCommon {

    indicator = '{char}';

    unmapConflicts(node: RecursiveMap, keyToMap: string): void {
        delete node[this.indicator];

        if (keyToMap === this.indicator) {
            node = {};
        }
    }

}
