import {RecursiveMap} from '../Mapper';

export interface SpecialKeyCommon {
    indicator: string;

    unmapConflicts(node: RecursiveMap, keyToMap: string): void;
    match(inputs: string[]): [number, {}];
}
