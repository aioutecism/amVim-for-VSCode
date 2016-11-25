import * as BlackBox from '../Framework/BlackBox';

suite.only('VisualLine: p', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: '[]foo\nbar\nabc',
            inputs: 'V y V p',
            to: '[]foo\nbar\nabc',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
