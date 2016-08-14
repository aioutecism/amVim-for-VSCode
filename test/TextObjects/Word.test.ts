import * as assert from 'assert';
import * as TestUtil from '../Util';
import {Position} from 'vscode';

import {TextObjectWord} from '../../src/TextObjects/Word';
import {Configuration} from '../../src/Configuration';

export function run() {

    Configuration.init();

    test('with single word on line starting inside of word', (done) => {
        TestUtil.createTempDocument('  word').then(() => {
            const exclusiveObj = TextObjectWord.byWord({ useBlankSeparatedStyle: false, isInclusive: false });
            const exclusiveRange = exclusiveObj.apply(new Position(0, 2));

            assert.equal(exclusiveRange.start.character, 2);
            assert.equal(exclusiveRange.end.character, 5);

            const inclusiveObj = TextObjectWord.byWord({ useBlankSeparatedStyle: false, isInclusive: true });
            const inclusiveRange = inclusiveObj.apply(new Position(0, 2));

            assert.equal(inclusiveRange.start.character, 0);
            assert.equal(inclusiveRange.end.character, 5);

            done();
        });
    });

}
