import * as BlackBox from '../Framework/BlackBox';

suite('Visual: > .', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: 'f[oo\nba]r\nabc',
            inputs: '> .',
            to: '        []foo\n        bar\nabc',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i], (textEditor) => {
            textEditor.options.insertSpaces = true;
            textEditor.options.tabSize = 4;
        });
    }
});

suite('Visual: < .', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: '        f[oo\n        ba]r\nabc',
            inputs: '< .',
            to: '[]foo\nbar\nabc',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i], (textEditor) => {
            textEditor.options.insertSpaces = true;
            textEditor.options.tabSize = 4;
        });
    }
});
