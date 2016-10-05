import * as assert from 'assert';
import * as TestUtil from '../Util';
import {Selection} from 'vscode';

import {Configuration} from '../../src/Configuration';
import {ActionSelection} from '../../src/Actions/Selection';
import {TextObjectWord} from '../../src/TextObjects/Word';

export function run() {

    Configuration.init();

    test('ActionSelection.expandByTextObject', (done) => {
        TestUtil.createTempDocument('Foo  bar!@#  end').then(() => {
            const testCases = [
                // 0123456789012345
                // Foo  bar!@#  end
                // |
                {
                    from: new Selection(0, 0, 0, 1),
                    to: new Selection(0, 0, 0, 3)
                },
                // 0123456789012345
                // Foo  bar!@#  end
                //  |
                {
                    from: new Selection(0, 1, 0, 2),
                    to: new Selection(0, 0, 0, 3)
                },
                // 0123456789012345
                // Foo  bar!@#  end
                //       ___|
                {
                    from: new Selection(0, 6, 0, 10),
                    to: new Selection(0, 6, 0, 11)
                },
                // 0123456789012345
                // Foo  bar!@#  end
                //       |___
                {
                    from: new Selection(0, 10, 0, 6),
                    to: new Selection(0, 10, 0, 5)
                },
                // 0123456789012345
                // Foo  bar!@#  end
                //      |____
                {
                    from: new Selection(0, 10, 0, 5),
                    to: new Selection(0, 10, 0, 3)
                },
                // 0123456789012345
                // Foo  bar!@#  end
                //  |
                {
                    from: new Selection(0, 2, 0, 1),
                    to: new Selection(0, 3, 0, 0)
                },
                // 0123456789012345
                // Foo  bar!@#  end
                // |
                {
                    from: new Selection(0, 1, 0, 0),
                    to: new Selection(0, 3, 0, 0)
                },
            ];

            let promise = Promise.resolve();

            while (testCases.length > 0) {
                const testCase = testCases.shift();
                promise = promise.then(() => {
                    TestUtil.setSelection(testCase.from);

                    return ActionSelection.expandByTextObject({
                        textObject: TextObjectWord.byWord({ useBlankSeparatedStyle: false, isInclusive: false })
                    }).then(() => {
                        assert.deepEqual(TestUtil.getSelection(), testCase.to);
                    });
                });
            }

            promise.then(() => {
                done();
            }, (error) => {
                done(error);
            });
        });
    });
};
