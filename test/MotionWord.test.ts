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

    let nextEnd = MotionWord.characterDelta.bind(
        MotionWord, line, MotionWordPosition.NEXT_END
    );

    // Defines a Mocha unit test
    test("MotionWordPosition.NEXT_END", () => {

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //  ^   *                    
        assert.equal(nextEnd(0), 4 - 0);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //   ^  *                    
        assert.equal(nextEnd(1), 4 - 1);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //    ^ *                    
        assert.equal(nextEnd(2), 4 - 2);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //     ^*                    
        assert.equal(nextEnd(2), 4 - 2);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //      ^   *                
        assert.equal(nextEnd(4), 8 - 4);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //       ^  *                
        assert.equal(nextEnd(5), 8 - 5);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //        ^ *                
        assert.equal(nextEnd(6), 8 - 6);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //         ^*                
        assert.equal(nextEnd(7), 8 - 7);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //          ^   *            
        assert.equal(nextEnd(8), 12 - 8);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //           ^  *            
        assert.equal(nextEnd(9), 12 - 9);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //            ^ *            
        assert.equal(nextEnd(10), 12 - 10);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //             ^*            
        assert.equal(nextEnd(11), 12 - 11);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //              ^      *     
        assert.equal(nextEnd(12), 19 - 12);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //               ^     *     
        assert.equal(nextEnd(13), 19 - 13);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //                ^    *     
        assert.equal(nextEnd(14), 19 - 14);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //                 ^   *     
        assert.equal(nextEnd(15), 19 - 15);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //                  ^  *     
        assert.equal(nextEnd(16), 19 - 16);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //                   ^ *     
        assert.equal(nextEnd(17), 19 - 17);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //                    ^*     
        assert.equal(nextEnd(18), 19 - 18);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //                     ^*    
        assert.equal(nextEnd(19), 20 - 19);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //                      ^  * 
        assert.equal(nextEnd(20), 23 - 20);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //                       ^ * 
        assert.equal(nextEnd(21), 23 - 21);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //                        ^* 
        assert.equal(nextEnd(22), 23 - 22);

        /* FAILING
        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //                         ^*
        assert.equal(nextEnd(23), 24 - 23);
        */
    });

    let prevStart = MotionWord.characterDelta.bind(
        MotionWord, line, MotionWordPosition.PREV_START
    );

    // Defines a Mocha unit test
    test("MotionWordPosition.PREV_START", () => {

        /* FAILING
        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        // *^                        
        assert.equal(prevStart(0), (-1) - 0);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        // * ^                       
        assert.equal(prevStart(1), (-1) - 1);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        // *  ^                      
        assert.equal(prevStart(2), (-1) - 2);
        */

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //    *^                     
        assert.equal(prevStart(3), (2) - 3);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //    * ^                    
        assert.equal(prevStart(4), (2) - 4);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //    *  ^                   
        assert.equal(prevStart(5), (2) - 5);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //    *   ^                  
        assert.equal(prevStart(6), (2) - 6);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //        *^                 
        assert.equal(prevStart(7), (6) - 7);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //        * ^                
        assert.equal(prevStart(8), (6) - 8);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //        *  ^               
        assert.equal(prevStart(9), (6) - 9);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //        *   ^              
        assert.equal(prevStart(10), (6) - 10);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //            *^             
        assert.equal(prevStart(11), (10) - 11);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //            * ^            
        assert.equal(prevStart(12), (10) - 12);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //            *  ^           
        assert.equal(prevStart(13), (10) - 13);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //            *   ^          
        assert.equal(prevStart(14), (10) - 14);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //            *    ^         
        assert.equal(prevStart(15), (10) - 15);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //            *     ^        
        assert.equal(prevStart(16), (10) - 16);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //            *      ^       
        assert.equal(prevStart(17), (10) - 17);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //                   *^      
        assert.equal(prevStart(18), (17) - 18);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //                   * ^     
        assert.equal(prevStart(19), (17) - 19);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //                   *  ^    
        assert.equal(prevStart(20), (17) - 20);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //                      *^   
        assert.equal(prevStart(21), (20) - 21);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //                       *^  
        assert.equal(prevStart(22), (21) - 22);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //                       * ^ 
        assert.equal(prevStart(23), (21) - 23);
    });
}
