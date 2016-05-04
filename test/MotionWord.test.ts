import * as assert from 'assert';
import * as TestUtil from './Util';
import {Position} from 'vscode';

import {Configuration} from '../src/Configuration';
import {MotionWord} from '../src/Motions/Word';

export function run() {

    Configuration.init();

    test('MotionWordPosition.NEXT_START', (done) => {
        TestUtil.createTempDocument('  foo bar baz    fum-nom').then(() => {

            let apply = (fromCharacter) => {
                let motion = MotionWord.nextStart();
                return motion.apply(new Position(0, fromCharacter)).character;
            };

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //  ^ *
            assert.equal(apply(0), 2);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //   ^*
            assert.equal(apply(1), 2);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //    ^   *
            assert.equal(apply(2), 6);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //     ^  *
            assert.equal(apply(3), 6);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //      ^ *
            assert.equal(apply(4), 6);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //       ^*
            assert.equal(apply(5), 6);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //        ^   *
            assert.equal(apply(6), 10);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //         ^  *
            assert.equal(apply(7), 10);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //          ^ *
            assert.equal(apply(8), 10);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //           ^*
            assert.equal(apply(9), 10);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //            ^      *
            assert.equal(apply(10), 17);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //             ^     *
            assert.equal(apply(11), 17);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //              ^    *
            assert.equal(apply(12), 17);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //               ^   *
            assert.equal(apply(13), 17);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //                ^  *
            assert.equal(apply(14), 17);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //                 ^ *
            assert.equal(apply(15), 17);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //                  ^*
            assert.equal(apply(16), 17);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //                   ^  *
            assert.equal(apply(17), 20);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //                    ^ *
            assert.equal(apply(18), 20);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //                     ^*
            assert.equal(apply(19), 20);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //                      ^*
            assert.equal(apply(20), 21);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //                       ^  *
            assert.equal(apply(21), 24);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //                        ^ *
            assert.equal(apply(22), 24);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //                         ^*
            assert.equal(apply(23), 24);

            done();

        });
    });

    test('MotionWordPosition.NEXT_END', (done) => {
        TestUtil.createTempDocument('  foo bar baz    fum-nom').then(() => {

            let apply = (fromCharacter) => {
                let motion = MotionWord.nextEnd();
                return motion.apply(new Position(0, fromCharacter)).character;
            };

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //  ^   *
            assert.equal(apply(0), 4);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //   ^  *
            assert.equal(apply(1), 4);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //    ^ *
            assert.equal(apply(2), 4);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //     ^*
            assert.equal(apply(2), 4);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //      ^   *
            assert.equal(apply(4), 8);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //       ^  *
            assert.equal(apply(5), 8);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //        ^ *
            assert.equal(apply(6), 8);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //         ^*
            assert.equal(apply(7), 8);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //          ^   *
            assert.equal(apply(8), 12);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //           ^  *
            assert.equal(apply(9), 12);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //            ^ *
            assert.equal(apply(10), 12);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //             ^*
            assert.equal(apply(11), 12);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //              ^      *
            assert.equal(apply(12), 19);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //               ^     *
            assert.equal(apply(13), 19);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //                ^    *
            assert.equal(apply(14), 19);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //                 ^   *
            assert.equal(apply(15), 19);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //                  ^  *
            assert.equal(apply(16), 19);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //                   ^ *
            assert.equal(apply(17), 19);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //                    ^*
            assert.equal(apply(18), 19);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //                     ^*
            assert.equal(apply(19), 20);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //                      ^  *
            assert.equal(apply(20), 23);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //                       ^ *
            assert.equal(apply(21), 23);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //                        ^*
            assert.equal(apply(22), 23);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //                         ^*
            assert.equal(apply(23), 24);

            done();

        });
    });

    test('MotionWordPosition.PREV_START', (done) => {
        TestUtil.createTempDocument('  foo bar baz    fum-nom').then(() => {

            let apply = (fromCharacter) => {
                let motion = MotionWord.prevStart();
                return motion.apply(new Position(0, fromCharacter)).character;
            };

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            // *^
            assert.equal(apply(0), 0);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            // * ^
            assert.equal(apply(1), 0);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            // *  ^
            assert.equal(apply(2), 0);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //    *^
            assert.equal(apply(3), (2));

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //    * ^
            assert.equal(apply(4), (2));

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //    *  ^
            assert.equal(apply(5), (2));

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //    *   ^
            assert.equal(apply(6), (2));

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //        *^
            assert.equal(apply(7), (6));

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //        * ^
            assert.equal(apply(8), (6));

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //        *  ^
            assert.equal(apply(9), (6));

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //        *   ^
            assert.equal(apply(10), (6));

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //            *^
            assert.equal(apply(11), (10));

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //            * ^
            assert.equal(apply(12), (10));

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //            *  ^
            assert.equal(apply(13), (10));

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //            *   ^
            assert.equal(apply(14), (10));

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //            *    ^
            assert.equal(apply(15), (10));

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //            *     ^
            assert.equal(apply(16), (10));

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //            *      ^
            assert.equal(apply(17), (10));

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //                   *^
            assert.equal(apply(18), (17));

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //                   * ^
            assert.equal(apply(19), (17));

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //                   *  ^
            assert.equal(apply(20), (17));

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //                      *^
            assert.equal(apply(21), (20));

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //                       *^
            assert.equal(apply(22), (21));

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //                       * ^
            assert.equal(apply(23), (21));

            done();

        });
    });

    test('MotionWordPosition.PREV_END', (done) => {
        TestUtil.createTempDocument('  foo bar baz    fum-nom').then(() => {

            let apply = (fromCharacter) => {
                let motion = MotionWord.prevEnd();
                return motion.apply(new Position(0, fromCharacter)).character;
            };

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            // *^
            assert.equal(apply(0), 0);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            // * ^
            assert.equal(apply(1), 0);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            // *  ^
            assert.equal(apply(2), 0);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            // *   ^
            assert.equal(apply(3), 0);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            // *    ^
            assert.equal(apply(4), 0);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //      *^
            assert.equal(apply(5), 4);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //      * ^
            assert.equal(apply(6), 4);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //      *  ^
            assert.equal(apply(7), 4);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //      *   ^
            assert.equal(apply(8), 4);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //          *^
            assert.equal(apply(9), 8);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //          * ^
            assert.equal(apply(10), 8);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //          *  ^
            assert.equal(apply(11), 8);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //          *   ^
            assert.equal(apply(12), 8);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //              *^
            assert.equal(apply(13), 12);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //              * ^
            assert.equal(apply(14), 12);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //              *  ^
            assert.equal(apply(15), 12);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //              *   ^
            assert.equal(apply(16), 12);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //              *    ^
            assert.equal(apply(17), 12);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //              *     ^
            assert.equal(apply(18), 12);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //              *      ^
            assert.equal(apply(19), 12);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //                     *^
            assert.equal(apply(20), 19);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //                      *^
            assert.equal(apply(21), 20);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //                      * ^
            assert.equal(apply(22), 20);

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //                      *  ^
            assert.equal(apply(23), 20);

            done();

        });
    });

    test('MotionWordPosition.NEXT_START with blankSeparators', (done) => {
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

    test('MotionWordPosition.NEXT_END with blankSeparators', (done) => {
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

    test('MotionWordPosition.PREV_START with blankSeparators', (done) => {
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

    test('MotionWordPosition.PREV_END with blankSeparators', (done) => {
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
