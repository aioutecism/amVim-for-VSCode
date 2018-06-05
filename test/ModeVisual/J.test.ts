import * as BlackBox from '../Framework/BlackBox';

suite('Visual: J', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: '[foo\nb]ar\nabc',
            inputs: 'J',
            to: 'foo[] bar\nabc',
        },
        {
            from: '[f]o[o]\nbar\nabc',
            inputs: 'J',
            to: 'foo[] bar\nabc',
        },
        {
            from: '[foo\nb]ar\nabc\n[123\n4]56\n789',
            inputs: 'J',
            to: 'foo bar\nabc\n123[] 456\n789',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
