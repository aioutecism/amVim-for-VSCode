import {Action} from '../Actions/Action';
import {GenericMapper, GenericMap, MatchResult, MatchResultKind} from './Generic';
import {SpecialKeyN} from './SpecialKeys/N';
import {SpecialKeyChar} from './SpecialKeys/Char';
import {SpecialKeyMotion} from './SpecialKeys/Motion';
import {SpecialKeyTextObject} from './SpecialKeys/TextObject';

export interface CommandMatchResult extends MatchResult {
    kind: MatchResultKind;
    map?: CommandMap;
}

export interface CommandMap extends GenericMap {
    actions: Action[];
    isRepeating?: boolean;
}

export class CommandMapper extends GenericMapper {

    constructor() {
        super([
            new SpecialKeyN(),
            new SpecialKeyMotion(),
            new SpecialKeyTextObject(),
            new SpecialKeyChar(),
        ]);
    }

    map(joinedKeys: string, actions: Action[], args?: {}): void {
        const map = super.map(joinedKeys, args);
        (map as CommandMap).actions = actions;
    }

    match(inputs: string[]): CommandMatchResult {
        const {kind, map} = super.match(inputs);

        return {
            kind,
            map: map ? map as CommandMap : undefined
        };
    }

}
