import * as assert from 'assert';
import * as TestUtil from '../../Util';
import {Position} from 'vscode';

import {Configuration} from '../../../src/Configuration';
import {MotionWord} from '../../../src/Motions/Word';

export function run() {

    Configuration.init();

    test('MotionWord: Next start with N.', (done) => {
        TestUtil.createTempDocument('  foo bar baz    fum-nom').then(() => {

            let apply = (fromCharacter, n) => {
                let motion = MotionWord.nextStart({n: n});
                return motion.apply(new Position(0, fromCharacter)).character;
            };

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //  ^ *
            assert.equal(apply(0, 1), 2);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //  ^     *
            assert.equal(apply(0, 2), 6);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //  ^                       *
            assert.equal(apply(0, 7), 24);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //  ^                       *
            assert.equal(apply(0, 10000), 24);

            done();

        });
    });

    test('MotionWord: Prev start with N.', (done) => {
        TestUtil.createTempDocument('  foo bar baz    fum-nom').then(() => {

            let apply = (fromCharacter, n) => {
                let motion = MotionWord.prevStart({n: n});
                return motion.apply(new Position(0, fromCharacter)).character;
            };

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //                       * ^
            assert.equal(apply(23, 1), 21);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //                      *  ^
            assert.equal(apply(23, 2), 20);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //  *                      ^
            assert.equal(apply(23, 7), 0);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //  *                      ^
            assert.equal(apply(23, 10000), 0);

            done();

        });
    });
}
