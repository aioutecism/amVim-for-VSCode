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

interface TextObjectMapInfo {
    fromCharacters: string[];
    args: {
        openingCharacter: string,
        closingCharacter: string,
        searchingRange: TextObjectSearchingRange,
    };
}

export class SpecialKeyTextObject extends GenericMapper implements SpecialKeyCommon {

    indicator = '{textObject}';

    private conflictRegExp = /^[1-9]|\{N\}|\{char\}$/;

    private mapInfos: TextObjectMapInfo[] = [
        { fromCharacters: ['b', '(', ')'], args: {
            openingCharacter: '(',
            closingCharacter: ')',
            searchingRange: TextObjectSearchingRange.Document,
        } },
        { fromCharacters: ['[', ']'], args: {
            openingCharacter: '[',
            closingCharacter: ']',
            searchingRange: TextObjectSearchingRange.Document,
        } },
        { fromCharacters: ['B', '{', '}'], args: {
            openingCharacter: '{',
            closingCharacter: '}',
            searchingRange: TextObjectSearchingRange.Document,
        } },
        { fromCharacters: ['<', '>'], args: {
            openingCharacter: '<',
            closingCharacter: '>',
            searchingRange: TextObjectSearchingRange.Document,
        } },
        { fromCharacters: ['\''], args: {
            openingCharacter: '\'',
            closingCharacter: '\'',
            searchingRange: TextObjectSearchingRange.Line,
        } },
        // TODO: Search after cursor for opening character.
        { fromCharacters: ['"'], args: {
            openingCharacter: '"',
            closingCharacter: '"',
            searchingRange: TextObjectSearchingRange.Line,
        } },
        { fromCharacters: ['`'], args: {
            openingCharacter: '`',
            closingCharacter: '`',
            searchingRange: TextObjectSearchingRange.Line,
        } },
    ];

    private maps: TextObjectMap[] = [
        // Reserved for special maps.
    ];

    constructor() {
        super();

        this.mapInfos.forEach(mapInfo => {
            mapInfo.fromCharacters.forEach(character => {
                this.map(`i ${character}`, TextObjectCharacterPairs.exclusive, mapInfo.args);
                this.map(`a ${character}`, TextObjectCharacterPairs.inclusive, mapInfo.args);
            });
        });

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
