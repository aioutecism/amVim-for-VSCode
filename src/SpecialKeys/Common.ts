import {Command} from '../Modes/Mode';
import {RecursiveMap} from '../Mapper';

export interface SpecialKeyCommon {
    indicator: string;

    unmapConflicts(node: RecursiveMap, keyToMap: string): void;
    // map(joinedKeys: string, command: Command, args?: {}): void;
    // match(inputs: string[], root: Map): {} | boolean;
}
