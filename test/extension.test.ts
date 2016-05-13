//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

import * as MotionWordTests from './MotionWord.test';
import * as TextObjectsWordTest from './TextObjects/Word.test';

// Defines a Mocha test suite to group tests of similar kind together
suite('Extension Tests', () => {
    suite('MotionWordTests', () => {
        MotionWordTests.run();
    });

    suite('TextObjectsTests', () => {
        TextObjectsWordTest.run();
    });
});
