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

    match(inputs: string[], node: RecursiveMap): {} | boolean {
        if (! node[this.indicator]) {
            return false;
        }

        let character = inputs[0];

        if (character === 'space') {
            character = ' ';
        }

        return {character};
    }

}
