import {GenericMapper, GenericMap, RecursiveMap, MatchResultKind} from '../Generic';
import {SpecialKeyCommon, SpecialKeyMatchResult} from './Common';
import {SpecialKeyN} from './N';
import {SpecialKeyChar} from './Char';
import {Motion} from '../../Motions/Motion';
import {MotionCharacter} from '../../Motions/Character';
import {MotionDirection} from '../../Motions/Direction';
import {MotionWord} from '../../Motions/Word';
import {MotionMatch} from '../../Motions/Match';
import {MotionMatchPair} from '../../Motions/MatchPair';
import {MotionLine} from '../../Motions/Line';
import {MotionParagraph} from '../../Motions/Paragraph';
import {MotionDocument} from '../../Motions/Document';

interface MotionGenerator {
    (args?: {}): Motion;
}

interface MotionMap extends GenericMap {
    motionGenerators: MotionGenerator[];
}

export class SpecialKeyMotion extends GenericMapper implements SpecialKeyCommon {

    indicator = '{motion}';

    private conflictRegExp = /^[0]|\{char\}$/;

    private maps: MotionMap[] = [
        { keys: 'h',     motionGenerators: [MotionCharacter.left] },
        { keys: 'left',  motionGenerators: [MotionCharacter.left] },
        { keys: 'l',     motionGenerators: [MotionCharacter.right] },
        { keys: 'right', motionGenerators: [MotionCharacter.right] },
        { keys: 'k',     motionGenerators: [MotionCharacter.up] },
        { keys: 'up',    motionGenerators: [MotionCharacter.up] },
        { keys: 'j',     motionGenerators: [MotionCharacter.down] },
        { keys: 'down',  motionGenerators: [MotionCharacter.down] },

        { keys: 'w', motionGenerators: [MotionWord.nextStart] },
        { keys: 'W', motionGenerators: [MotionWord.nextStart], args: {useBlankSeparatedStyle: true} },
        { keys: 'e', motionGenerators: [MotionWord.nextEnd] },
        { keys: 'E', motionGenerators: [MotionWord.nextEnd], args: {useBlankSeparatedStyle: true} },
        { keys: 'b', motionGenerators: [MotionWord.prevStart] },
        { keys: 'B', motionGenerators: [MotionWord.prevStart], args: {useBlankSeparatedStyle: true} },

        { keys: 'f {char}', motionGenerators: [MotionMatch.next] },
        { keys: 'F {char}', motionGenerators: [MotionMatch.prev] },
        { keys: 't {char}', motionGenerators: [MotionMatch.next], args: {isTill: true} },
        { keys: 'T {char}', motionGenerators: [MotionMatch.prev], args: {isTill: true} },

        { keys: '%', motionGenerators: [MotionMatchPair.matchPair] },

        { keys: '^', motionGenerators: [MotionLine.firstNonBlank] },
        { keys: '0', motionGenerators: [MotionLine.start] },
        { keys: '$', motionGenerators: [MotionLine.end] },

        { keys: '-', motionGenerators: [MotionCharacter.up, MotionLine.firstNonBlank] },
        { keys: '+', motionGenerators: [MotionCharacter.down, MotionLine.firstNonBlank] },
        { keys: '_', motionGenerators: [
            (args: {n?: number}) => MotionCharacter.down({ n: (args.n === undefined ? 0 : args.n - 1) }),
            MotionLine.firstNonBlank
        ] },

        { keys: '{', motionGenerators: [MotionParagraph.prev] },
        { keys: '}', motionGenerators: [MotionParagraph.next] },

        { keys: 'g g', motionGenerators: [MotionDocument.toLineOrFirst, MotionLine.firstNonBlank] },
        { keys: 'G',   motionGenerators: [MotionDocument.toLineOrLast, MotionLine.firstNonBlank] },

        { keys: 'space', motionGenerators: [MotionDirection.next] },
        { keys: 'backspace', motionGenerators: [MotionDirection.prev] },
    ];

    constructor() {
        super([
            new SpecialKeyChar(),
        ]);

        this.maps.forEach(map => {
            this.map(map.keys, map.motionGenerators, map.args);
        });
    }

    map(joinedKeys: string, motionGenerators: MotionGenerator[], args?: {}): void {
        const map = super.map(joinedKeys, args);
        (map as MotionMap).motionGenerators = motionGenerators;
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

    matchSpecial(
        inputs: string[],
        additionalArgs: {[key: string]: any},
        lastSpecialKeyMatch?: SpecialKeyMatchResult,
    ): SpecialKeyMatchResult | null {
        const {kind, map} = this.match(inputs);

        if (kind === MatchResultKind.FAILED) {
            return null;
        }

        if (map) {
            // Take N from last special key match.
            if (lastSpecialKeyMatch && lastSpecialKeyMatch.specialKey instanceof SpecialKeyN) {
                map.args = Object.assign(map.args, { n: additionalArgs.n });
                delete additionalArgs.n;
            }

            additionalArgs.motions = (map as MotionMap).motionGenerators.map(generator => generator(map.args));
        }

        return {
            specialKey: this,
            kind,
            matchedCount: inputs.length,
        };
    }

}
