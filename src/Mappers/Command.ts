import {Command} from '../Modes/Mode';
import {GenericMapper, GenericMap, MatchResult, MatchResultKind} from './Generic';
import {SpecialKeyN} from './SpecialKeys/N';
import {SpecialKeyChar} from './SpecialKeys/Char';
import {SpecialKeyMotion} from './SpecialKeys/Motion';

export interface CommandMatchResult extends MatchResult {
    kind: MatchResultKind;
    map: CommandMap
}

export interface CommandMap extends GenericMap {
    command: Command;
}

export class CommandMapper extends GenericMapper {

    constructor() {
        super([
            new SpecialKeyN(),
            new SpecialKeyMotion(),
            new SpecialKeyChar(),
        ]);
    }

    map(joinedKeys: string, command: Command, args?: {}): void {
        const map = super.map(joinedKeys, args);
        (map as CommandMap).command = command;
    }

    match(inputs: string[]): CommandMatchResult {
        const {kind, map} = super.match(inputs);

        return {
            kind,
            map: map ? map as CommandMap : null
        };
    }

}
