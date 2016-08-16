import * as assert from 'assert';
import * as TestUtil from '../Util';
import {Position} from 'vscode';

import {Configuration} from '../../src/Configuration';
import {ModeNormal} from '../../src/Modes/Normal';

export function run() {

    Configuration.init();

    test('Fast motion test', (done) => {
        TestUtil.createTempDocument('hello world').then(() => {
            TestUtil.setPosition(new Position(0, 3));
            // hello world
            //    ^
            let normalMode = new ModeNormal();
            normalMode.input('w');
            normalMode.input('b');
            normalMode.input('l');
            // expected
            // hello world
            //  ^
            setTimeout(() => {
                assert.deepEqual(new Position(0, 1), TestUtil.getPosition());
                done();
            }, 100);
        });
    });
}
