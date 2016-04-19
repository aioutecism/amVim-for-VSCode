import {GenericMapper, GenericMap, RecursiveMap, MatchResultKind} from '../Generic';
import {SpecialKeyCommon, SpecialKeyMatchResult} from './Common';
import {TextObject, TextObjectSearchingRange} from '../../TextObjects/TextObject';
import {TextObjectCharacterPairs} from '../../TextObjects/CharacterPairs';

interface TextObjectGenerator {
    (args?: {}): TextObject;
}

interface TextObjectMap extends GenericMap {
    textObjectGenerator: TextObjectGenerator;
}

export class SpecialKeyTextObject extends GenericMapper implements SpecialKeyCommon {

    indicator = '{textObject}';

    private conflictRegExp = /^[1-9]|\{N\}|\{char\}$/;

    private maps: TextObjectMap[] = [
        { keys: 'i {', textObjectGenerator: TextObjectCharacterPairs.exclusive, args: {
            openingCharacter: '{',
            closingCharacter: '}',
            searchingRange: TextObjectSearchingRange.Document
        } },
    ];

    constructor() {
        super();

        this.maps.forEach(map => {
            this.map(map.keys, map.textObjectGenerator, map.args);
        });
    }

    map(joinedKeys: string, textObjectGenerator: TextObjectGenerator, args?: {}): void {
        const map = super.map(joinedKeys, args);
        (map as TextObjectMap).textObjectGenerator = textObjectGenerator;
    }

    unmapConflicts(node: RecursiveMap, keyToMap: string): void {
        if (keyToMap === this.indicator) {
            Object.getOwnPropertyNames(node).forEach(key => {
                this.conflictRegExp.test(key) && delete node[key];
            });
        }

        if (this.conflictRegExp.test(keyToMap)) {
            delete node[this.indicator];
        }

        // This class has lower priority than other keys.
    }

    matchSpecial(inputs: string[]): SpecialKeyMatchResult {
        const {kind, map} = this.match(inputs);

        if (kind === MatchResultKind.FAILED) {
            return null;
        }

        let additionalArgs: {textObject?: TextObject} = {};
        if (map) {
            additionalArgs.textObject = (map as TextObjectMap).textObjectGenerator(map.args);
        }

        return {
            specialKey: this,
            kind,
            matchedCount: inputs.length,
            additionalArgs
        };
    }

}
