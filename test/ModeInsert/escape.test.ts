import * as BlackBox from '../Framework/BlackBox';

suite('Insert: escape', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: '  []foo bar',
            inputs: 'i escape',
            to: ' [] foo bar',
        },
        {
            from: '[]  foo bar',
            inputs: 'i escape',
            to: '[]  foo bar',
        },
        {
            from: '[]  foo []bar',
            inputs: 'i escape',
            to: '[]  foo[] bar',
        },
        {
            from: '[] [] foo bar',
            inputs: 'i escape',
            to: '[]  foo bar',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
