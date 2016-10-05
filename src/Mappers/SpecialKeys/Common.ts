import {RecursiveMap, MatchResultKind} from '../Generic';

export interface SpecialKeyMatchResult {
    specialKey: SpecialKeyCommon;
    kind: MatchResultKind;
    matchedCount: number;
    additionalArgs: {};
}

export interface SpecialKeyCommon {
    indicator: string;

    unmapConflicts(node: RecursiveMap, keyToMap: string): void;
    matchSpecial(inputs: string[]): SpecialKeyMatchResult | null;
}
