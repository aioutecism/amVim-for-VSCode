import * as assert from 'assert';
import * as TestUtil from '../Util';
import {Position, Range} from 'vscode';

import {TextObjectWord} from '../../src/TextObjects/Word';
import {Configuration} from '../../src/Configuration';

export function run() {

    Configuration.init();

    test('TextObjectWord: Regular word style', (done) => {
        TestUtil.createTempDocument('Foo  bar!@#  end').then(() => {
            const exclusiveObj = TextObjectWord.byWord({ useBlankSeparatedStyle: false, isInclusive: false });
            const inclusiveObj = TextObjectWord.byWord({ useBlankSeparatedStyle: false, isInclusive: true });

            // Foo  bar!@#  end
            // 0123456789012345
            // ^
            assert.deepEqual(exclusiveObj.apply(new Position(0, 0)), new Range(0, 0, 0, 3));
            assert.deepEqual(inclusiveObj.apply(new Position(0, 0)), new Range(0, 0, 0, 5));

            // Foo  bar!@#  end
            // 0123456789012345
            //   ^
            assert.deepEqual(exclusiveObj.apply(new Position(0, 2)), new Range(0, 0, 0, 3));
            assert.deepEqual(inclusiveObj.apply(new Position(0, 2)), new Range(0, 0, 0, 5));

            // Foo  bar!@#  end
            // 0123456789012345
            //    ^
            assert.deepEqual(exclusiveObj.apply(new Position(0, 3)), new Range(0, 3, 0, 5));
            assert.deepEqual(inclusiveObj.apply(new Position(0, 3)), new Range(0, 3, 0, 8));

            // Foo  bar!@#  end
            // 0123456789012345
            //     ^
            assert.deepEqual(exclusiveObj.apply(new Position(0, 4)), new Range(0, 3, 0, 5));
            assert.deepEqual(inclusiveObj.apply(new Position(0, 4)), new Range(0, 3, 0, 8));

            // Foo  bar!@#  end
            // 0123456789012345
            //      ^
            assert.deepEqual(exclusiveObj.apply(new Position(0, 5)), new Range(0, 5, 0, 8));
            assert.deepEqual(inclusiveObj.apply(new Position(0, 5)), new Range(0, 3, 0, 8));

            // Foo  bar!@#  end
            // 0123456789012345
            //        ^
            assert.deepEqual(exclusiveObj.apply(new Position(0, 7)), new Range(0, 5, 0, 8));
            assert.deepEqual(inclusiveObj.apply(new Position(0, 7)), new Range(0, 3, 0, 8));

            // Foo  bar!@#  end
            // 0123456789012345
            //         ^
            assert.deepEqual(exclusiveObj.apply(new Position(0, 8)), new Range(0, 8, 0, 11));
            assert.deepEqual(inclusiveObj.apply(new Position(0, 8)), new Range(0, 8, 0, 13));

            // Foo  bar!@#  end
            // 0123456789012345
            //           ^
            assert.deepEqual(exclusiveObj.apply(new Position(0, 10)), new Range(0, 8, 0, 11));
            assert.deepEqual(inclusiveObj.apply(new Position(0, 10)), new Range(0, 8, 0, 13));

            // Foo  bar!@#  end
            // 0123456789012345
            //            ^
            assert.deepEqual(exclusiveObj.apply(new Position(0, 11)), new Range(0, 11, 0, 13));
            assert.deepEqual(inclusiveObj.apply(new Position(0, 11)), new Range(0, 11, 0, 16));

            // Foo  bar!@#  end
            // 0123456789012345
            //             ^
            assert.deepEqual(exclusiveObj.apply(new Position(0, 12)), new Range(0, 11, 0, 13));
            assert.deepEqual(inclusiveObj.apply(new Position(0, 12)), new Range(0, 11, 0, 16));

            // Foo  bar!@#  end
            // 0123456789012345
            //              ^
            assert.deepEqual(exclusiveObj.apply(new Position(0, 13)), new Range(0, 13, 0, 16));
            assert.deepEqual(inclusiveObj.apply(new Position(0, 13)), new Range(0, 11, 0, 16));

            // Foo  bar!@#  end
            // 0123456789012345
            //                ^
            assert.deepEqual(exclusiveObj.apply(new Position(0, 15)), new Range(0, 13, 0, 16));
            assert.deepEqual(inclusiveObj.apply(new Position(0, 15)), new Range(0, 11, 0, 16));

            done();
        });
    });

    test('TextObjectWord: Blank separated word style', (done) => {
        TestUtil.createTempDocument('Foo  bar!@#  end').then(() => {
            const exclusiveObj = TextObjectWord.byWord({ useBlankSeparatedStyle: true, isInclusive: false });
            const inclusiveObj = TextObjectWord.byWord({ useBlankSeparatedStyle: true, isInclusive: true });

            // Foo  bar!@#  end
            // 0123456789012345
            // ^
            assert.deepEqual(exclusiveObj.apply(new Position(0, 0)), new Range(0, 0, 0, 3));
            assert.deepEqual(inclusiveObj.apply(new Position(0, 0)), new Range(0, 0, 0, 5));

            // Foo  bar!@#  end
            // 0123456789012345
            //   ^
            assert.deepEqual(exclusiveObj.apply(new Position(0, 2)), new Range(0, 0, 0, 3));
            assert.deepEqual(inclusiveObj.apply(new Position(0, 2)), new Range(0, 0, 0, 5));

            // Foo  bar!@#  end
            // 0123456789012345
            //    ^
            assert.deepEqual(exclusiveObj.apply(new Position(0, 3)), new Range(0, 3, 0, 5));
            assert.deepEqual(inclusiveObj.apply(new Position(0, 3)), new Range(0, 3, 0, 11));

            // Foo  bar!@#  end
            // 0123456789012345
            //     ^
            assert.deepEqual(exclusiveObj.apply(new Position(0, 4)), new Range(0, 3, 0, 5));
            assert.deepEqual(inclusiveObj.apply(new Position(0, 4)), new Range(0, 3, 0, 11));

            // Foo  bar!@#  end
            // 0123456789012345
            //      ^
            assert.deepEqual(exclusiveObj.apply(new Position(0, 5)), new Range(0, 5, 0, 11));
            assert.deepEqual(inclusiveObj.apply(new Position(0, 5)), new Range(0, 5, 0, 13));

            // Foo  bar!@#  end
            // 0123456789012345
            //        ^
            assert.deepEqual(exclusiveObj.apply(new Position(0, 7)), new Range(0, 5, 0, 11));
            assert.deepEqual(inclusiveObj.apply(new Position(0, 7)), new Range(0, 5, 0, 13));

            // Foo  bar!@#  end
            // 0123456789012345
            //         ^
            assert.deepEqual(exclusiveObj.apply(new Position(0, 8)), new Range(0, 5, 0, 11));
            assert.deepEqual(inclusiveObj.apply(new Position(0, 8)), new Range(0, 5, 0, 13));

            // Foo  bar!@#  end
            // 0123456789012345
            //           ^
            assert.deepEqual(exclusiveObj.apply(new Position(0, 10)), new Range(0, 5, 0, 11));
            assert.deepEqual(inclusiveObj.apply(new Position(0, 10)), new Range(0, 5, 0, 13));

            // Foo  bar!@#  end
            // 0123456789012345
            //            ^
            assert.deepEqual(exclusiveObj.apply(new Position(0, 11)), new Range(0, 11, 0, 13));
            assert.deepEqual(inclusiveObj.apply(new Position(0, 11)), new Range(0, 11, 0, 16));

            // Foo  bar!@#  end
            // 0123456789012345
            //             ^
            assert.deepEqual(exclusiveObj.apply(new Position(0, 12)), new Range(0, 11, 0, 13));
            assert.deepEqual(inclusiveObj.apply(new Position(0, 12)), new Range(0, 11, 0, 16));

            // Foo  bar!@#  end
            // 0123456789012345
            //              ^
            assert.deepEqual(exclusiveObj.apply(new Position(0, 13)), new Range(0, 13, 0, 16));
            assert.deepEqual(inclusiveObj.apply(new Position(0, 13)), new Range(0, 11, 0, 16));

            // Foo  bar!@#  end
            // 0123456789012345
            //                ^
            assert.deepEqual(exclusiveObj.apply(new Position(0, 15)), new Range(0, 13, 0, 16));
            assert.deepEqual(inclusiveObj.apply(new Position(0, 15)), new Range(0, 11, 0, 16));

            done();
        });
    });

}
