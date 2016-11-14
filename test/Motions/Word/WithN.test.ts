import * as BlackBox from '../../BlackBox';

suite('MotionWord: Next start with N.', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: '[]  foo bar baz    fum-num',
            inputs: '1 w',
            to: '  []foo bar baz    fum-num',
        },
        {
            from: '[]  foo bar baz    fum-num',
            inputs: '2 w',
            to: '  foo []bar baz    fum-num',
        },
        {
            from: '[]  foo bar baz    fum-num',
            inputs: '7 w',
            to: '  foo bar baz    fum-nu[]m',
        },
        {
            from: '[]  foo bar baz    fum-num',
            inputs: '10000 w',
            to: '  foo bar baz    fum-nu[]m',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});

suite('MotionWord: Prev start with N.', () => {
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
