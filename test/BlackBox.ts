import * as assert from 'assert';
import * as TestUtil from './Util';
import {Selection} from 'vscode';
import {getCurrentMode} from '../src/extension';

export interface TestCase {
    from: string;
    inputs: string;
    to: string;
}

const waitForMillisecond = (millisecond: number) => {
    return new Promise(resolve => {
        setTimeout(() => resolve(), millisecond);
    });
};

const extractInfo = (originalString: string) => {
    const selections: Selection[] = [];

    const cleanString = originalString.replace(
        /~?\[(.*?)\]/mg,
        (match: string, content: string, offset: number) => {
            const isReversed = match[0] === '~';

            const startOffset = offset + (isReversed ? 1 : 0);
            const endOffset = offset + content.length;

            const selection = isReversed
                ? new Selection(0, endOffset, 0, startOffset)
                : new Selection(0, startOffset, 0, endOffset);

            selections.push(selection);

            return content;
        }
    );

    return {
        selections,
        cleanString,
    };
};

export const run = (testCase: TestCase) => {
    const expectation = `${testCase.from} => ${testCase.to} (inputs: ${testCase.inputs})`;

    test(expectation, (done) => {
        const fromInfo = extractInfo(testCase.from);
        const toInfo = extractInfo(testCase.to);
        const inputs = testCase.inputs.split(' ');

        TestUtil.createTempDocument(fromInfo.cleanString)
        .then(async () => {
            TestUtil.setSelections(fromInfo.selections);

            await waitForMillisecond(100);

            inputs.forEach(key => {
                getCurrentMode()!.input(key);
            });

            await waitForMillisecond(inputs.length * 20);

            assert.equal(TestUtil.getDocument().getText(), toInfo.cleanString);
            assert.deepEqual(TestUtil.getSelections(), toInfo.selections);

            done();
        });
    });
};
