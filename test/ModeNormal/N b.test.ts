import * as BlackBox from '../Framework/BlackBox';

suite('Normal: N b', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: '  foo bar baz    fum-nu[]m',
            inputs: '1 b',
            to: '  foo bar baz    fum-[]num',
        },
        {
            from: '  foo bar baz    fum-nu[]m',
            inputs: '2 b',
            to: '  foo bar baz    fum[]-num',
        },
        {
            from: '  foo bar baz    fum-nu[]m',
            inputs: '7 b',
            to: '[]  foo bar baz    fum-num',
        },
        {
            from: '  foo bar baz    fum-nu[]m',
            inputs: '10000 b',
            to: '[]  foo bar baz    fum-num',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
