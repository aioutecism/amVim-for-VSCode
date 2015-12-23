import {RecursiveMap, MatchResultType} from '../Mapper';

export interface SpecialKeyCommon {
    indicator: string;

    unmapConflicts(node: RecursiveMap, keyToMap: string): void;
    match(inputs: string[]): {type: MatchResultType, matchedCount?: number, additionalArgs? : {}};
}
