import * as assert from 'assert';
import * as TestUtil from './Util';
import { TextEditor, TextDocument, Selection, extensions } from 'vscode';

export interface TestCase {
    language?: string;
    from: string;
    inputs: string;
    to: string;
}

const waitForMillisecond = (millisecond: number) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => resolve(), millisecond);
    });
};

const getLine = (text: string, offset: number) => {
    let count = 0;
    let position = -1;

    while (true) {
        position = text.indexOf('\n', position + 1);
        if (position < 0 || position >= offset) {
            break;
        }
        count++;
    }

    return count;
};

const getCharacter = (text: string, offset: number) => {
    const textToTheLeft = text.substring(0, offset);
    const lastLineBreakIndex = textToTheLeft.lastIndexOf('\n');

    if (lastLineBreakIndex < 0) {
        return offset;
    } else {
        return offset - (lastLineBreakIndex + 1);
    }
};

const extractInfo = (originalText: string) => {
    const selections: Selection[] = [];

    let cleanText = originalText;

    while (true) {
        let hasMatch = false;

        cleanText = cleanText.replace(
            /~?\[([\s\S]*?)\]/m,
            (match: string, content: string, startOffset: number) => {
                hasMatch = true;

                const endOffset = startOffset + match.length - 1;
                const isReversed = match[0] === '~';

                const startLine = getLine(cleanText, startOffset);
                const endLine = getLine(cleanText, endOffset);

                let startCharacter = getCharacter(cleanText, startOffset);
                let endCharacter = getCharacter(cleanText, endOffset);

                if (startLine === endLine) {
                    // Minus `[` mark.
                    endCharacter -= 1;

                    if (isReversed) {
                        // Minus `~` mark.
                        endCharacter -= 1;
                    }
                }

                selections.push(
                    isReversed
                        ? new Selection(endLine, endCharacter, startLine, startCharacter)
                        : new Selection(startLine, startCharacter, endLine, endCharacter),
                );

                return content;
            },
        );

        if (!hasMatch) {
            break;
        }
    }

    return {
        selections,
        cleanText,
    };
};

export const toJs = (s: Selection) => ({
    active: {
        line: s.active.line,
        character: s.active.character,
    },
    anchor: {
        line: s.anchor.line,
        character: s.anchor.character,
    },
});

const reusableDocuments: Map<string, TextDocument> = new Map();

export const run = (testCase: TestCase, before?: (textEditor: TextEditor) => void) => {
    const plainFrom = testCase.from.replace(/\n/g, '\\n');
    const plainTo = testCase.to.replace(/\n/g, '\\n');
    const expectation = `Inputs: ${testCase.inputs}\n> ${plainFrom}\n< ${plainTo}`;
    let tries = 0;

    const { getCurrentMode } = extensions.getExtension('auiworks.amvim')?.exports;

    test(expectation, (done) => {
        tries++;

        const language = testCase.language || 'plaintext';
        const fromInfo = extractInfo(testCase.from);
        const toInfo = extractInfo(testCase.to);
        const inputs = testCase.inputs.split(' ');

        TestUtil.createTempDocument(
            fromInfo.cleanText,
            reusableDocuments.get(language),
            language,
        ).then(async (textEditor) => {
            reusableDocuments.set(textEditor.document.languageId, textEditor.document);

            if (before) {
                before(textEditor);
            }

            TestUtil.setSelections(fromInfo.selections);

            await waitForMillisecond(50 * tries);

            for (let i = 0; i < inputs.length; i++) {
                getCurrentMode()!.input(inputs[i]);
                await waitForMillisecond(20 * tries);
            }

            if (language !== 'plaintext') {
                await waitForMillisecond(50 * tries);
            }

            try {
                assert.equal(TestUtil.getDocument()!.getText(), toInfo.cleanText);
                assert.deepEqual(TestUtil.getSelections().map(toJs), toInfo.selections.map(toJs));
            } catch (error) {
                done(error);
                return;
            }

            done();
        });
    });
};
