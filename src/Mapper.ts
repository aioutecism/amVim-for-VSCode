import {Command} from './Modes/Mode';
import * as SpecialKey from './SpecialKey';

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
    private static characterIndicator: string = '{char}';

    private specialKeys: SpecialKey.Common[] = [
        new SpecialKey.N(),
        new SpecialKey.Motion(),
        new SpecialKey.Char(),
    ];
    private root: RecursiveMap = {};

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
        let additionalArgs = {};

        const exists = inputs.every(input => {
            let _node = node;

            _node = node[input];
            if (_node) {
                node = _node;
                return true;
            }

            _node = node[Mapper.characterIndicator];
            if (_node) {
                node = _node;
                additionalArgs['character'] = input === 'space' ? ' ' : input;
                return true;
            }

            return false;
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
