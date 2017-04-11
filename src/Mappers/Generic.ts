import {SpecialKeyCommon, SpecialKeyMatchResult} from './SpecialKeys/Common';

export enum MatchResultKind {FAILED, WAITING, FOUND}

export interface MatchResult {
    kind: MatchResultKind;
    map?: GenericMap;
}

export interface GenericMap {
    keys: string;
    args?: {};
}

export interface RecursiveMap {
    [key: string]: RecursiveMap | GenericMap;
}

export abstract class GenericMapper {

    private static separator: string = ' ';
    private specialKeys: SpecialKeyCommon[];

    private root: RecursiveMap = {};

    constructor(specialKeys: SpecialKeyCommon[] = []) {
        this.specialKeys = specialKeys;
    }

    private static isMapLeaf(node: RecursiveMap | GenericMap): boolean {
        return node && typeof (node as GenericMap).keys === 'string';
    }

    protected map(joinedKeys: string, args?: {}): void | GenericMap {
        const map = {
            keys: joinedKeys,
            args: args || undefined,
        };

        let node: RecursiveMap | GenericMap = this.root;
        const keys = joinedKeys.split(GenericMapper.separator);

        keys.forEach((key, index) => {
            this.specialKeys.forEach(specialKey => {
                specialKey.unmapConflicts(node as RecursiveMap, key);
            });

            if (GenericMapper.isMapLeaf(node[key])) {
                delete node[key];
            }

            if (index === keys.length - 1) {
                node[key] = map;
            }
            else {
                node[key] = node[key] || {};
                node = node[key];
            }
        });

        return map;
    }

    protected match(inputs: string[]): MatchResult {
        let node: RecursiveMap | GenericMap = this.root;

        let matched = true;
        let additionalArgs = {};

        let lastSpecialKeyMatch: SpecialKeyMatchResult | undefined;

        for (let index = 0; index < inputs.length; index++) {
            const input = inputs[index];

            if (node[input]) {
                node = node[input];
                continue;
            }

            let match: SpecialKeyMatchResult | null | undefined;

            this.specialKeys.some(specialKey => {
                if (! node[specialKey.indicator]) {
                    return false;
                }

                match = specialKey.matchSpecial(inputs.slice(index), additionalArgs, lastSpecialKeyMatch);

                return match ? true : false;
            });

            if (match) {
                if (match.kind === MatchResultKind.FOUND) {
                    node = node[match.specialKey.indicator];

                    lastSpecialKeyMatch = match;
                    index += match.matchedCount - 1;
                    continue;
                }
                else if (match.kind === MatchResultKind.WAITING) {
                    break;
                }
            }

            matched = false;
            break;
        }

        if (! matched) {
            return {kind: MatchResultKind.FAILED};
        }
        else if (GenericMapper.isMapLeaf(node)) {
            // Make a copy of node and args object
            const map = Object.assign({}, node) as GenericMap;
            const args = Object.assign({}, map.args);

            Object.getOwnPropertyNames(additionalArgs).forEach(name => {
                args[name] = additionalArgs[name];
            });

            map.args = args;

            return {kind: MatchResultKind.FOUND, map};
        }
        else {
            return {kind: MatchResultKind.WAITING};
        }
    }

}
