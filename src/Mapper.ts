import {Command} from './Modes/Mode';
import {SpecialKeyCommon, SpecialKeyMatchResult} from './SpecialKeys/Common';

export interface Map {
    keys: string;
    command: Command;
    args?: {};
}

export interface RecursiveMap {
    [key: string]: RecursiveMap | Map;
}

export enum MatchResultType {FAILED, WAITING, FOUND};

export class Mapper {

    protected static saparator: string = ' ';
    protected specialKeys: SpecialKeyCommon[];

    private root: RecursiveMap = {};

    constructor(specialKeys: SpecialKeyCommon[] = []) {
        this.specialKeys = specialKeys;
    }

    private static isMap(node: RecursiveMap | Map): boolean {
        return node && typeof (node as Map).command === 'function';
    }

    map(joinedKeys: string, command: Command, args?: {}): void {
        let node: RecursiveMap | Map = this.root;
        const keys = joinedKeys.split(Mapper.saparator);

        keys.forEach((key, index) => {
            this.specialKeys.forEach(specialKey => {
                specialKey.unmapConflicts(node as RecursiveMap, key);
            })

            if (Mapper.isMap(node[key])) {
                delete node[key];
            }

            if (index === keys.length - 1) {
                node[key] = {
                    keys: joinedKeys,
                    command,
                    args: args || {},
                };
            }
            else {
                node[key] = node[key] || {};
                node = node[key];
            }
        });
    }

    unmap(joinedKeys: string): void {
        let node: RecursiveMap | Map = this.root;

        const keys = joinedKeys.split(Mapper.saparator);
        const lastKey = keys.pop();

        keys.every(key => {
            node = node[key];
            return node ? true : false;
        });

        if (node) {
            delete node[lastKey];
        }
    }

    match(inputs: string[]): {type: MatchResultType, map?: Map} {
        let node: RecursiveMap | Map = this.root;

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
        else if (Mapper.isMap(node)) {
            const map = node as Map;

            Object.getOwnPropertyNames(additionalArgs).forEach(key => {
                map.args[key] = additionalArgs[key];
            })

            return {type: MatchResultType.FOUND, map};
        }
        else {
            return {type: MatchResultType.WAITING};
        }
    }

}
