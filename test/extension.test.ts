//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

import leftRightMotions from './testSets/leftRightMotions';
import * as MotionWordTests from './MotionWord.test';
import * as Runner from './Runner.test';

// Defines a Mocha test suite to group tests of similar kind together
suite('Extension Tests', () => {
    Runner.run();
});
