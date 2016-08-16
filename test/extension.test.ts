//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

import * as MotionWordTest from './Motions/Word.test';
import * as MotionIntegrationTest from './Motions/Integration.test';
import * as TextObjectWordTest from './TextObjects/Word.test';
import * as ActionSelectionTest from './Actions/Selection.test';

// Defines a Mocha test suite to group tests of similar kind together
suite('Extension Tests', () => {
    MotionWordTest.run();
    MotionIntegrationTest.run();

    ActionSelectionTest.run();

    TextObjectWordTest.run();
});
