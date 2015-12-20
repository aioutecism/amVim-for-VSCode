import {Command} from './Modes/Mode';

export interface Map {
    keys: string;
    command: Command;
    args?: {};
}

interface RecursiveMap {
    [key: string]: RecursiveMap | Map;
}

export enum MatchResultType {FAILED, WAITING, FOUND};

export class Mapper {

    private static saparator: string = ' ';
    private static characterIndicator: string = '{char}';

    private root: RecursiveMap = {};

    private static isMap(node: RecursiveMap | Map): boolean {
        return typeof (node as Map).command === 'function';
    }

    map(joinedKeys: string, command: Command, args?: {}): void {
        let node: RecursiveMap | Map = this.root;

        const keys = joinedKeys.split(Mapper.saparator);
        const lastKey = keys.pop();

        keys.forEach(key => {
            if (! node[key] || Mapper.isMap(node[key])) {
                node[key] = {};
            }
            node = node[key];
        });

        node[lastKey] = {
            keys: joinedKeys,
            command: command,
            args: args || {},
        };
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
                additionalArgs['character'] = input;
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
