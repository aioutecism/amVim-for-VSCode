import {SpecialKeyCommon, SpecialKeyMatchResult} from './SpecialKeys/Common';

export enum MatchResultType {FAILED, WAITING, FOUND};

export interface GenericMap {
    keys: string;
    args?: {};
}

export interface RecursiveMap {
    [key: string]: RecursiveMap | GenericMap;
}

export abstract class GenericMapper {

    private static saparator: string = ' ';
    private specialKeys: SpecialKeyCommon[];

    private root: RecursiveMap = {};

    constructor(specialKeys: SpecialKeyCommon[] = []) {
        this.specialKeys = specialKeys;
    }

    private static isGenericMap(node: RecursiveMap | GenericMap): boolean {
        return node && typeof (node as GenericMap).keys === 'string';
    }

    protected map(joinedKeys: string, args?: {}): void | GenericMap {
        const map = {
            keys: joinedKeys,
            args: args || undefined,
        };

        let node: RecursiveMap | GenericMap = this.root;
        const keys = joinedKeys.split(GenericMapper.saparator);

        keys.forEach((key, index) => {
            this.specialKeys.forEach(specialKey => {
                specialKey.unmapConflicts(node as RecursiveMap, key);
            })

            if (GenericMapper.isGenericMap(node[key])) {
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

    protected match(inputs: string[]): {type: MatchResultType, map?: GenericMap} {
        let node: RecursiveMap | GenericMap = this.root;

        let matched = true;
        let additionalArgs = {};

        for (var index = 0; index < inputs.length; index++) {
            const input = inputs[index];

            if (node[input]) {
                node = node[input];
                continue;
            }

            // match must be reassigned or it will use last loops's value
            var match: SpecialKeyMatchResult = null;
            this.specialKeys.some(specialKey => {
                if (! node[specialKey.indicator]) {
                    return false;
                }

                match = specialKey.match(inputs.slice(index));

                return match ? true : false;
            });

            if (match) {
                if (match.type === MatchResultType.FOUND) {
                    node = node[match.specialKey.indicator];

                    Object.getOwnPropertyNames(match.additionalArgs).forEach(key => {
                        additionalArgs[key] = match.additionalArgs[key];
                    });

                    index += match.matchedCount - 1;
                    continue;
                }
                else if (match.type === MatchResultType.WAITING) {
                    break;
                }
            }

            matched = false;
            break;
        }

        if (! matched) {
            return {type: MatchResultType.FAILED};
        }
        else if (GenericMapper.isGenericMap(node)) {
            const map = node as GenericMap;

            Object.getOwnPropertyNames(additionalArgs).forEach(key => {
                map.args = map.args || {};
                map.args[key] = additionalArgs[key];
            })

            return {type: MatchResultType.FOUND, map};
        }
        else {
            return {type: MatchResultType.WAITING};
        }
    }

}
