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

    // Defines a Mocha unit test
    test("MotionWordPosition.NEXT_START", () => {
        const line = "  foo bar baz    fum-nom";
    
        let nextStart = (fromCharacter) => {
            let motion = new MotionWord();
            return motion.createCharacterDelta(
                line, MotionWordPosition.NEXT_START, fromCharacter
            );
        };

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

    // Defines a Mocha unit test
    test("MotionWordPosition.NEXT_END", () => {
        const line = "  foo bar baz    fum-nom";

        let nextEnd = (fromCharacter) => {
            let motion = new MotionWord();
            return motion.createCharacterDelta(
                line, MotionWordPosition.NEXT_END, fromCharacter
            );
        };
        
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



    // Defines a Mocha unit test
    test("MotionWordPosition.PREV_START", () => {
        const line = "  foo bar baz    fum-nom";

        let prevStart = (fromCharacter) => {
            let motion = new MotionWord();
            return motion.createCharacterDelta(
                line, MotionWordPosition.PREV_START, fromCharacter
            );
        };
        
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



    // Defines a Mocha unit test
    test("MotionWordPosition.PREV_END", () => {
        const line = "  foo bar baz    fum-nom";

        let prevEnd = (fromCharacter) => {
            let motion = new MotionWord();
            return motion.createCharacterDelta(
                line, MotionWordPosition.PREV_END, fromCharacter
            );
        };
        
        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        // *^                        
        assert.equal(prevEnd(0), (-1) - 0);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        // * ^                       
        assert.equal(prevEnd(1), (-1) - 1);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        // *  ^                      
        assert.equal(prevEnd(2), (-1) - 2);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        // *   ^                     
        assert.equal(prevEnd(3), (-1) - 3);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        // *    ^                    
        assert.equal(prevEnd(4), (-1) - 4);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //      *^                   
        assert.equal(prevEnd(5), (4) - 5);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //      * ^                  
        assert.equal(prevEnd(6), (4) - 6);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //      *  ^                 
        assert.equal(prevEnd(7), (4) - 7);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //      *   ^                
        assert.equal(prevEnd(8), (4) - 8);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //          *^               
        assert.equal(prevEnd(9), (8) - 9);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //          * ^              
        assert.equal(prevEnd(10), (8) - 10);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //          *  ^             
        assert.equal(prevEnd(11), (8) - 11);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //          *   ^            
        assert.equal(prevEnd(12), (8) - 12);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //              *^           
        assert.equal(prevEnd(13), (12) - 13);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //              * ^          
        assert.equal(prevEnd(14), (12) - 14);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //              *  ^         
        assert.equal(prevEnd(15), (12) - 15);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //              *   ^        
        assert.equal(prevEnd(16), (12) - 16);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //              *    ^       
        assert.equal(prevEnd(17), (12) - 17);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //              *     ^      
        assert.equal(prevEnd(18), (12) - 18);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //              *      ^     
        assert.equal(prevEnd(19), (12) - 19);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //                     *^    
        assert.equal(prevEnd(20), (19) - 20);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //                      *^   
        assert.equal(prevEnd(21), (20) - 21);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //                      * ^  
        assert.equal(prevEnd(22), (20) - 22);

        //  0123456789112345678921234
        // "  foo bar baz    fum-nom"
        //                      *  ^ 
        assert.equal(prevEnd(23), (20) - 23);
    });
    
    test("MotionWordPosition.NEXT_START with blankSeparators", () => {
        const line = " <foo-bar> (baz$foo)  bar";
    
        let nextStart = (fromCharacter) => {
            let motion = new MotionWord({useBlankSeparatedStyle: true});
            return motion.createCharacterDelta(
                line, MotionWordPosition.NEXT_START, fromCharacter
            );
        };
        
        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //  ^*                      
        assert.equal(nextStart(0), 1);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //   ^         *                      
        assert.equal(nextStart(1), 11 - 1);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //    ^        *
        assert.equal(nextStart(2), 11 - 2);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //     ^       *
        assert.equal(nextStart(3), 11 - 3);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //      ^      *
        assert.equal(nextStart(4), 11 - 4);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //       ^     *
        assert.equal(nextStart(5), 11 - 5);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //        ^    *
        assert.equal(nextStart(6), 11 - 6);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //         ^   *
        assert.equal(nextStart(7), 11 - 7);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //          ^  *
        assert.equal(nextStart(8), 11 - 8);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //           ^ *
        assert.equal(nextStart(9), 11 - 9);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //            ^*
        assert.equal(nextStart(10), 11 - 10);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //             ^          *   
        assert.equal(nextStart(11), 22 - 11);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //              ^         *       
        assert.equal(nextStart(12), 22 - 12);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //               ^        *       
        assert.equal(nextStart(13), 22 - 13);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //                ^       *       
        assert.equal(nextStart(14), 22 - 14);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //                 ^      *       
        assert.equal(nextStart(15), 22 - 15);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //                  ^     *       
        assert.equal(nextStart(16), 22 - 16);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //                   ^    *    
        assert.equal(nextStart(17), 22 - 17);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //                    ^   *    
        assert.equal(nextStart(18), 22 - 18);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //                     ^  *    
        assert.equal(nextStart(19), 22 - 19);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //                      ^ *   
        assert.equal(nextStart(20), 22 - 20);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //                       ^*
        assert.equal(nextStart(21), 22 - 21);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //                        ^ *
        assert.equal(nextStart(22), 25 - 22);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //                         ^*
        assert.equal(nextStart(23), 25 - 23);
    });
    
    test("MotionWordPosition.NEXT_END with blankSeparators", () => {
        const line = " <foo-bar> (baz$foo)  bar";

        let nextEnd = (fromCharacter) => {
            let motion = new MotionWord({useBlankSeparatedStyle: true});
            return motion.createCharacterDelta(
                line, MotionWordPosition.NEXT_END, fromCharacter
            );
        };
        
        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //  ^        *                    
        assert.equal(nextEnd(0), 9 - 0);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //   ^       *                    
        assert.equal(nextEnd(1), 9 - 1);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //    ^      *                    
        assert.equal(nextEnd(2), 9 - 2);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //     ^     *                    
        assert.equal(nextEnd(3), 9 - 3);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //      ^    *                
        assert.equal(nextEnd(4), 9 - 4);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //       ^   *                
        assert.equal(nextEnd(5), 9 - 5);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //        ^  *                
        assert.equal(nextEnd(6), 9 - 6);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //         ^ *                
        assert.equal(nextEnd(7), 9 - 7);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //          ^*            
        assert.equal(nextEnd(8), 9 - 8);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //           ^         *            
        assert.equal(nextEnd(9), 19 - 9);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //            ^        *            
        assert.equal(nextEnd(10), 19 - 10);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //             ^       *            
        assert.equal(nextEnd(11), 19 - 11);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //              ^      *     
        assert.equal(nextEnd(12), 19 - 12);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //               ^     *     
        assert.equal(nextEnd(13), 19 - 13);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //                ^    *     
        assert.equal(nextEnd(14), 19 - 14);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //                 ^   *     
        assert.equal(nextEnd(15), 19 - 15);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //                  ^  *     
        assert.equal(nextEnd(16), 19 - 16);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //                   ^ *     
        assert.equal(nextEnd(17), 19 - 17);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //                    ^*     
        assert.equal(nextEnd(18), 19 - 18);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //                     ^    *    
        assert.equal(nextEnd(19), 24 - 19);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //                      ^   * 
        assert.equal(nextEnd(20), 24 - 20);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //                       ^  * 
        assert.equal(nextEnd(21), 24 - 21);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //                        ^ * 
        assert.equal(nextEnd(22), 24 - 22);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //                         ^*
        assert.equal(nextEnd(23), 24 - 23);
    });
    
    test("MotionWordPosition.PREV_START with blankSeparators", () => {
        const line = " <foo-bar> (baz$foo)  bar";

        let prevStart = (fromCharacter) => {
            let motion = new MotionWord({useBlankSeparatedStyle: true});
            return motion.createCharacterDelta(
                line, MotionWordPosition.PREV_START, fromCharacter
            );
        };
        
        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //  ^                        
        assert.equal(prevStart(0), 0 - 0);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //  *^                       
        assert.equal(prevStart(1), 0 - 1);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //   *^                      
        assert.equal(prevStart(2), 1 - 2);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //   * ^                     
        assert.equal(prevStart(3), 1 - 3);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //   *  ^                    
        assert.equal(prevStart(4), 1 - 4);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //   *   ^                   
        assert.equal(prevStart(5), 1 - 5);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //   *    ^                  
        assert.equal(prevStart(6), 1 - 6);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //   *     ^                 
        assert.equal(prevStart(7), 1 - 7);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //   *      ^                
        assert.equal(prevStart(8), 1 - 8);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //   *       ^               
        assert.equal(prevStart(9), 1 - 9);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //   *        ^               
        assert.equal(prevStart(10), 1 - 10);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //   *         ^             
        assert.equal(prevStart(11), 1 - 11);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //             *^            
        assert.equal(prevStart(12), 11 - 12);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //             * ^           
        assert.equal(prevStart(13), 11 - 13);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //             *  ^          
        assert.equal(prevStart(14), 11 - 14);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //             *   ^         
        assert.equal(prevStart(15), 11 - 15);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //             *    ^        
        assert.equal(prevStart(16), 11 - 16);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //             *     ^       
        assert.equal(prevStart(17), 11 - 17);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //             *      ^      
        assert.equal(prevStart(18), 11 - 18);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //             *       ^     
        assert.equal(prevStart(19), 11 - 19);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //             *        ^    
        assert.equal(prevStart(20), 11 - 20);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //             *         ^   
        assert.equal(prevStart(21), 11 - 21);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //             *          ^  
        assert.equal(prevStart(22), 11 - 22);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //                        *^ 
        assert.equal(prevStart(23), 22 - 23);
        
        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //                        * ^ 
        assert.equal(prevStart(24), 22 - 24);
    });
    
    test("MotionWordPosition.PREV_END with blankSeparators", () => {
        const line = " <foo-bar> (baz$foo)  bar";

        let prevEnd = (fromCharacter) => {
            let motion = new MotionWord({useBlankSeparatedStyle: true});
            return motion.createCharacterDelta(
                line, MotionWordPosition.PREV_END, fromCharacter
            );
        };
        
        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        // *^                        
        assert.equal(prevEnd(0), (-1) - 0);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        // * ^                       
        assert.equal(prevEnd(1), (-1) - 1);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        // *  ^                      
        assert.equal(prevEnd(2), (-1) - 2);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        // *   ^                     
        assert.equal(prevEnd(3), (-1) - 3);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        // *    ^                    
        assert.equal(prevEnd(4), (-1) - 4);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        // *     ^                   
        assert.equal(prevEnd(5), (-1) - 5);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        // *      ^                  
        assert.equal(prevEnd(6), (-1) - 6);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        // *       ^                 
        assert.equal(prevEnd(7), (-1) - 7);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        // *        ^                
        assert.equal(prevEnd(8), (-1) - 8);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        // *         ^               
        assert.equal(prevEnd(9), (-1) - 9);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //           *^              
        assert.equal(prevEnd(10), 9 - 10);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //           * ^             
        assert.equal(prevEnd(11), 9 - 11);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //           *  ^            
        assert.equal(prevEnd(12), 9 - 12);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //           *   ^           
        assert.equal(prevEnd(13), 9 - 13);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //           *    ^          
        assert.equal(prevEnd(14), 9 - 14);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //           *     ^         
        assert.equal(prevEnd(15), 9 - 15);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //           *      ^        
        assert.equal(prevEnd(16), 9 - 16);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //           *       ^       
        assert.equal(prevEnd(17), 9 - 17);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //           *        ^      
        assert.equal(prevEnd(18), 9 - 18);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //           *         ^     
        assert.equal(prevEnd(19), 9 - 19);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //                     *^    
        assert.equal(prevEnd(20), 19 - 20);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //                     * ^   
        assert.equal(prevEnd(21), 19 - 21);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //                     *  ^  
        assert.equal(prevEnd(22), 19 - 22);

        //  0123456789112345678921234
        // " <foo-bar> (baz$foo)  bar"
        //                     *   ^ 
        assert.equal(prevEnd(23), 19 - 23);
    });
}
