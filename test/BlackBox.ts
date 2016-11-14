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

    let removedCharacterCount = 0;

    const cleanString = originalString.replace(
        /~?\[(.*?)\]/mg,
        (match: string, content: string, offset: number) => {
            const isReversed = match[0] === '~';

            offset -= removedCharacterCount;
            removedCharacterCount += match.length - content.length;

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

            for (let i = 0; i < inputs.length; i++) {
                getCurrentMode()!.input(inputs[i]);
                await waitForMillisecond(20);
            }

            try {
                assert.equal(TestUtil.getDocument().getText(), toInfo.cleanString);
                assert.deepEqual(TestUtil.getSelections(), toInfo.selections);
            }
            catch (error) {
                done(error);
                return;
            }

            done();
        });
    });
};
