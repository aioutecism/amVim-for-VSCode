//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

import leftRightMotionTests from './testSets/LeftRightMotions.test';
import textObjectMotionTests from './testSets/TextObjectMotions.test';
import {Runner} from './Runner';
import * as TestUtil from './util';

// Defines a Mocha test suite to group tests of similar kind together
suite('Extension Tests', () => {
    setup((done) => {
        TestUtil.createTempDocument().then(e => {
            done();
        });
    });

    let runner = new Runner();

    runner.run(leftRightMotionTests);
    runner.run(textObjectMotionTests);
});
