import * as assert from 'assert';
import * as TestUtil from '../../Util';
import {Position} from 'vscode';

import {Configuration} from '../../../src/Configuration';
import {MotionWord} from '../../../src/Motions/Word';

export function run() {

    Configuration.init();

    test('MotionWord: Next start with blank separated style', (done) => {
        TestUtil.createTempDocument(' <foo-bar> (baz$foo)  bar').then(() => {

            let apply = (fromCharacter) => {
                let motion = MotionWord.nextStart({ useBlankSeparatedStyle: true });
                return motion.apply(new Position(0, fromCharacter)).character;
            };

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //  ^*
            assert.equal(apply(0), 1);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //   ^         *
            assert.equal(apply(1), 11);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //    ^        *
            assert.equal(apply(2), 11);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //     ^       *
            assert.equal(apply(3), 11);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //      ^      *
            assert.equal(apply(4), 11);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //       ^     *
            assert.equal(apply(5), 11);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //        ^    *
            assert.equal(apply(6), 11);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //         ^   *
            assert.equal(apply(7), 11);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //          ^  *
            assert.equal(apply(8), 11);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //           ^ *
            assert.equal(apply(9), 11);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //            ^*
            assert.equal(apply(10), 11);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //             ^          *
            assert.equal(apply(11), 22);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //              ^         *
            assert.equal(apply(12), 22);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //               ^        *
            assert.equal(apply(13), 22);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //                ^       *
            assert.equal(apply(14), 22);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //                 ^      *
            assert.equal(apply(15), 22);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //                  ^     *
            assert.equal(apply(16), 22);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //                   ^    *
            assert.equal(apply(17), 22);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //                    ^   *
            assert.equal(apply(18), 22);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //                     ^  *
            assert.equal(apply(19), 22);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //                      ^ *
            assert.equal(apply(20), 22);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //                       ^*
            assert.equal(apply(21), 22);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //                        ^ *
            assert.equal(apply(22), 25);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //                         ^*
            assert.equal(apply(23), 25);

            done();

        });
    });

    test('MotionWord: Next end with blank separated style', (done) => {
        TestUtil.createTempDocument(' <foo-bar> (baz$foo)  bar').then(() => {

            let apply = (fromCharacter) => {
                let motion = MotionWord.nextEnd({ useBlankSeparatedStyle: true });
                return motion.apply(new Position(0, fromCharacter)).character;
            };

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //  ^        *
            assert.equal(apply(0), 9);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //   ^       *
            assert.equal(apply(1), 9);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //    ^      *
            assert.equal(apply(2), 9);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //     ^     *
            assert.equal(apply(3), 9);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //      ^    *
            assert.equal(apply(4), 9);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //       ^   *
            assert.equal(apply(5), 9);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //        ^  *
            assert.equal(apply(6), 9);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //         ^ *
            assert.equal(apply(7), 9);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //          ^*
            assert.equal(apply(8), 9);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //           ^         *
            assert.equal(apply(9), 19);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //            ^        *
            assert.equal(apply(10), 19);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //             ^       *
            assert.equal(apply(11), 19);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //              ^      *
            assert.equal(apply(12), 19);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //               ^     *
            assert.equal(apply(13), 19);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //                ^    *
            assert.equal(apply(14), 19);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //                 ^   *
            assert.equal(apply(15), 19);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //                  ^  *
            assert.equal(apply(16), 19);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //                   ^ *
            assert.equal(apply(17), 19);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //                    ^*
            assert.equal(apply(18), 19);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //                     ^    *
            assert.equal(apply(19), 24);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //                      ^   *
            assert.equal(apply(20), 24);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //                       ^  *
            assert.equal(apply(21), 24);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //                        ^ *
            assert.equal(apply(22), 24);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //                         ^*
            assert.equal(apply(23), 24);

            done();

        });
    });

    test('MotionWord: Prev start with blank separated style', (done) => {
        TestUtil.createTempDocument(' <foo-bar> (baz$foo)  bar').then(() => {

            let apply = (fromCharacter) => {
                let motion = MotionWord.prevStart({ useBlankSeparatedStyle: true });
                return motion.apply(new Position(0, fromCharacter)).character;
            };

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //  ^
            assert.equal(apply(0), 0);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //  *^
            assert.equal(apply(1), 0);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //   *^
            assert.equal(apply(2), 1);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //   * ^
            assert.equal(apply(3), 1);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //   *  ^
            assert.equal(apply(4), 1);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //   *   ^
            assert.equal(apply(5), 1);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //   *    ^
            assert.equal(apply(6), 1);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //   *     ^
            assert.equal(apply(7), 1);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //   *      ^
            assert.equal(apply(8), 1);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //   *       ^
            assert.equal(apply(9), 1);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //   *        ^
            assert.equal(apply(10), 1);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //   *         ^
            assert.equal(apply(11), 1);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //             *^
            assert.equal(apply(12), 11);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //             * ^
            assert.equal(apply(13), 11);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //             *  ^
            assert.equal(apply(14), 11);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //             *   ^
            assert.equal(apply(15), 11);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //             *    ^
            assert.equal(apply(16), 11);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //             *     ^
            assert.equal(apply(17), 11);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //             *      ^
            assert.equal(apply(18), 11);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //             *       ^
            assert.equal(apply(19), 11);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //             *        ^
            assert.equal(apply(20), 11);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //             *         ^
            assert.equal(apply(21), 11);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //             *          ^
            assert.equal(apply(22), 11);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //                        *^
            assert.equal(apply(23), 22);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //                        * ^
            assert.equal(apply(24), 22);

            done();

        });
    });

    test('MotionWord: Prev end with blank separated style', (done) => {
        TestUtil.createTempDocument(' <foo-bar> (baz$foo)  bar').then(() => {

            let apply = (fromCharacter) => {
                let motion = MotionWord.prevEnd({ useBlankSeparatedStyle: true });
                return motion.apply(new Position(0, fromCharacter)).character;
            };

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            // *^
            assert.equal(apply(0), 0);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            // * ^
            assert.equal(apply(1), 0);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            // *  ^
            assert.equal(apply(2), 0);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            // *   ^
            assert.equal(apply(3), 0);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            // *    ^
            assert.equal(apply(4), 0);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            // *     ^
            assert.equal(apply(5), 0);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            // *      ^
            assert.equal(apply(6), 0);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            // *       ^
            assert.equal(apply(7), 0);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            // *        ^
            assert.equal(apply(8), 0);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            // *         ^
            assert.equal(apply(9), 0);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //           *^
            assert.equal(apply(10), 9);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //           * ^
            assert.equal(apply(11), 9);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //           *  ^
            assert.equal(apply(12), 9);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //           *   ^
            assert.equal(apply(13), 9);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //           *    ^
            assert.equal(apply(14), 9);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //           *     ^
            assert.equal(apply(15), 9);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //           *      ^
            assert.equal(apply(16), 9);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //           *       ^
            assert.equal(apply(17), 9);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //           *        ^
            assert.equal(apply(18), 9);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //           *         ^
            assert.equal(apply(19), 9);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //                     *^
            assert.equal(apply(20), 19);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //                     * ^
            assert.equal(apply(21), 19);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //                     *  ^
            assert.equal(apply(22), 19);

            //  0123456789112345678921234
            // ' <foo-bar> (baz$foo)  bar'
            //                     *   ^
            assert.equal(apply(23), 19);

            done();

        });
    });
}
