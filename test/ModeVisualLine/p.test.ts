import * as BlackBox from '../Framework/BlackBox';

suite('VisualLine: p', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: '[]foo\nbar\nabc',
            inputs: 'V y V p',
            to: '[]foo\nbar\nabc',
        },
        {
            from: '[]foo\nbar\nabc',
            inputs: 'V y j V p',
            to: 'foo\n[]foo\nabc',
        },
        {
            from: '[]foo\nbar\nabc',
            inputs: 'V y j V p p',
            to: 'foo\nfoo\n[]bar\nabc',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
