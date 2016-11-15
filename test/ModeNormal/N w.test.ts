import * as BlackBox from '../Framework/BlackBox';

suite('Normal: N w', () => {
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
