//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import {MotionWord, MotionWordPosition} from '../src/Motions/Word';

export function run() {
    const line = "  foo bar baz    fum-nom";

    let nextStart = MotionWord.characterDelta.bind(
        MotionWord, line, MotionWordPosition.NEXT_START
    );

    // Defines a Mocha unit test
    test("MotionWordPosition.NEXT_START", () => {

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //  ^ *                      
        assert.equal(nextStart(0), 2 - 0);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //   ^*                      
        assert.equal(nextStart(1), 2 - 1);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //    ^   *                  
        assert.equal(nextStart(2), 6 - 2);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //     ^  *                  
        assert.equal(nextStart(3), 6 - 3);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //      ^ *                  
        assert.equal(nextStart(4), 6 - 4);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //       ^*                  
        assert.equal(nextStart(5), 6 - 5);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //        ^   *              
        assert.equal(nextStart(6), 10 - 6);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //         ^  *              
        assert.equal(nextStart(7), 10 - 7);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //          ^ *              
        assert.equal(nextStart(8), 10 - 8);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //           ^*              
        assert.equal(nextStart(9), 10 - 9);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //            ^      *       
        assert.equal(nextStart(10), 17 - 10);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //             ^     *       
        assert.equal(nextStart(11), 17 - 11);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //              ^    *       
        assert.equal(nextStart(12), 17 - 12);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //               ^   *       
        assert.equal(nextStart(13), 17 - 13);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //                ^  *       
        assert.equal(nextStart(14), 17 - 14);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //                 ^ *       
        assert.equal(nextStart(15), 17 - 15);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //                  ^*       
        assert.equal(nextStart(16), 17 - 16);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //                   ^  *    
        assert.equal(nextStart(17), 20 - 17);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //                    ^ *    
        assert.equal(nextStart(18), 20 - 18);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //                     ^*    
        assert.equal(nextStart(19), 20 - 19);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //                      ^*   
        assert.equal(nextStart(20), 21 - 20);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //                       ^  *
        assert.equal(nextStart(21), 24 - 21);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //                        ^ *
        assert.equal(nextStart(22), 24 - 22);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //                         ^*
        assert.equal(nextStart(23), 24 - 23);
    });
}
