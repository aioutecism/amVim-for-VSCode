// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

import {MotionPairMatch} from '../src/Motions/PairMatch';

export function run() {
    // Test opening match
    test("MotionPairMatch.matchOpening", () => {
         var motion = MotionPairMatch.matchOpening({character : "\""});
         //don't know how to mockup Position neither window.activeTextEditor
    });
}

