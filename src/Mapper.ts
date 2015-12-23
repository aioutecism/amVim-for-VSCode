import {Command} from './Modes/Mode';
import {SpecialKeyCommon} from './SpecialKeys/Common';
import {SpecialKeyN} from './SpecialKeys/N';
import {SpecialKeyChar} from './SpecialKeys/Char';
import {SpecialKeyMotion} from './SpecialKeys/Motion';

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

    private static saparator: string = ' ';
    private static specialKeys: SpecialKeyCommon[] = [
        new SpecialKeyN(),
        new SpecialKeyMotion(),
        new SpecialKeyChar(),
    ];

    private root: RecursiveMap = {};

    private static isMap(node: RecursiveMap | Map): boolean {
        return node && typeof (node as Map).command === 'function';
    }

    map(joinedKeys: string, command: Command, args?: {}): void {
        let node: RecursiveMap | Map = this.root;
        const keys = joinedKeys.split(Mapper.saparator);

        keys.forEach((key, index) => {
            Mapper.specialKeys.forEach(specialKey => {
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
        let additionalArgs = {};

        const exists = inputs.every((input, index) => {
            let _node = node;

            _node = node[input];
            if (_node) {
                node = _node;
                return true;
            }

            return Mapper.specialKeys.some(specialKey => {
                if (! node[specialKey.indicator]) {
                    return false;
                }

                const match = specialKey.match(inputs.slice(index));
                if (match) {
                    node = node[specialKey.indicator];
                    Object.getOwnPropertyNames(match[1]).forEach(key => {
                        additionalArgs[key] = match[1][key];
                    });
                    return true;
                }

                return false;
            });
        });

        if (! exists) {
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
