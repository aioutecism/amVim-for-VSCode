import * as BlackBox from '../../BlackBox';

suite('MotionWord: Next start', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: '[]  foo bar baz    fum-nom',
            inputs: 'w',
            to: '  []foo bar baz    fum-nom',
        },
        {
            from: ' [] foo bar baz    fum-nom',
            inputs: 'w',
            to: '  []foo bar baz    fum-nom',
        },
        {
            from: '  []foo bar baz    fum-nom',
            inputs: 'w',
            to: '  foo []bar baz    fum-nom',
        },
        {
            from: '  f[]oo bar baz    fum-nom',
            inputs: 'w',
            to: '  foo []bar baz    fum-nom',
        },
        {
            from: '  fo[]o bar baz    fum-nom',
            inputs: 'w',
            to: '  foo []bar baz    fum-nom',
        },
        {
            from: '  foo[] bar baz    fum-nom',
            inputs: 'w',
            to: '  foo []bar baz    fum-nom',
        },
        {
            from: '  foo []bar baz    fum-nom',
            inputs: 'w',
            to: '  foo bar []baz    fum-nom',
        },
        {
            from: '  foo b[]ar baz    fum-nom',
            inputs: 'w',
            to: '  foo bar []baz    fum-nom',
        },
        {
            from: '  foo ba[]r baz    fum-nom',
            inputs: 'w',
            to: '  foo bar []baz    fum-nom',
        },
        {
            from: '  foo bar[] baz    fum-nom',
            inputs: 'w',
            to: '  foo bar []baz    fum-nom',
        },
        {
            from: '  foo bar []baz    fum-nom',
            inputs: 'w',
            to: '  foo bar baz    []fum-nom',
        },
        {
            from: '  foo bar b[]az    fum-nom',
            inputs: 'w',
            to: '  foo bar baz    []fum-nom',
        },
        {
            from: '  foo bar ba[]z    fum-nom',
            inputs: 'w',
            to: '  foo bar baz    []fum-nom',
        },
        {
            from: '  foo bar baz[]    fum-nom',
            inputs: 'w',
            to: '  foo bar baz    []fum-nom',
        },
        {
            from: '  foo bar baz []   fum-nom',
            inputs: 'w',
            to: '  foo bar baz    []fum-nom',
        },
        {
            from: '  foo bar baz  []  fum-nom',
            inputs: 'w',
            to: '  foo bar baz    []fum-nom',
        },
        {
            from: '  foo bar baz   [] fum-nom',
            inputs: 'w',
            to: '  foo bar baz    []fum-nom',
        },
        {
            from: '  foo bar baz    []fum-nom',
            inputs: 'w',
            to: '  foo bar baz    fum[]-nom',
        },
        {
            from: '  foo bar baz    f[]um-nom',
            inputs: 'w',
            to: '  foo bar baz    fum[]-nom',
        },
        {
            from: '  foo bar baz    fu[]m-nom',
            inputs: 'w',
            to: '  foo bar baz    fum[]-nom',
        },
        {
            from: '  foo bar baz    fum[]-nom',
            inputs: 'w',
            to: '  foo bar baz    fum-[]nom',
        },
        {
            from: '  foo bar baz    fum-[]nom',
            inputs: 'w',
            to: '  foo bar baz    fum-no[]m',
        },
        {
            from: '  foo bar baz    fum-n[]om',
            inputs: 'w',
            to: '  foo bar baz    fum-no[]m',
        },
        {
            from: '  foo bar baz    fum-no[]m',
            inputs: 'w',
            to: '  foo bar baz    fum-no[]m',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});

suite('MotionWord: Next end', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: '[]  foo bar baz    fum-nom',
            inputs: 'e',
            to: '  fo[]o bar baz    fum-nom',
        },
        {
            from: ' [] foo bar baz    fum-nom',
            inputs: 'e',
            to: '  fo[]o bar baz    fum-nom',
        },
        {
            from: '  []foo bar baz    fum-nom',
            inputs: 'e',
            to: '  fo[]o bar baz    fum-nom',
        },
        {
            from: '  f[]oo bar baz    fum-nom',
            inputs: 'e',
            to: '  fo[]o bar baz    fum-nom',
        },
        {
            from: '  fo[]o bar baz    fum-nom',
            inputs: 'e',
            to: '  foo ba[]r baz    fum-nom',
        },
        {
            from: '  foo[] bar baz    fum-nom',
            inputs: 'e',
            to: '  foo ba[]r baz    fum-nom',
        },
        {
            from: '  foo []bar baz    fum-nom',
            inputs: 'e',
            to: '  foo ba[]r baz    fum-nom',
        },
        {
            from: '  foo b[]ar baz    fum-nom',
            inputs: 'e',
            to: '  foo ba[]r baz    fum-nom',
        },
        {
            from: '  foo ba[]r baz    fum-nom',
            inputs: 'e',
            to: '  foo bar ba[]z    fum-nom',
        },
        {
            from: '  foo bar[] baz    fum-nom',
            inputs: 'e',
            to: '  foo bar ba[]z    fum-nom',
        },
        {
            from: '  foo bar []baz    fum-nom',
            inputs: 'e',
            to: '  foo bar ba[]z    fum-nom',
        },
        {
            from: '  foo bar b[]az    fum-nom',
            inputs: 'e',
            to: '  foo bar ba[]z    fum-nom',
        },
        {
            from: '  foo bar ba[]z    fum-nom',
            inputs: 'e',
            to: '  foo bar baz    fu[]m-nom',
        },
        {
            from: '  foo bar baz[]    fum-nom',
            inputs: 'e',
            to: '  foo bar baz    fu[]m-nom',
        },
        {
            from: '  foo bar baz []   fum-nom',
            inputs: 'e',
            to: '  foo bar baz    fu[]m-nom',
        },
        {
            from: '  foo bar baz  []  fum-nom',
            inputs: 'e',
            to: '  foo bar baz    fu[]m-nom',
        },
        {
            from: '  foo bar baz   [] fum-nom',
            inputs: 'e',
            to: '  foo bar baz    fu[]m-nom',
        },
        {
            from: '  foo bar baz    []fum-nom',
            inputs: 'e',
            to: '  foo bar baz    fu[]m-nom',
        },
        {
            from: '  foo bar baz    f[]um-nom',
            inputs: 'e',
            to: '  foo bar baz    fu[]m-nom',
        },
        {
            from: '  foo bar baz    fu[]m-nom',
            inputs: 'e',
            to: '  foo bar baz    fum[]-nom',
        },
        {
            from: '  foo bar baz    fum[]-nom',
            inputs: 'e',
            to: '  foo bar baz    fum-no[]m',
        },
        {
            from: '  foo bar baz    fum-[]nom',
            inputs: 'e',
            to: '  foo bar baz    fum-no[]m',
        },
        {
            from: '  foo bar baz    fum-n[]om',
            inputs: 'e',
            to: '  foo bar baz    fum-no[]m',
        },
        {
            from: '  foo bar baz    fum-no[]m',
            inputs: 'e',
            to: '  foo bar baz    fum-no[]m',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});

suite('MotionWord: Prev start', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: '[]  foo bar baz    fum-nom',
            inputs: 'b',
            to: '[]  foo bar baz    fum-nom',
        },
        {
            from: ' [] foo bar baz    fum-nom',
            inputs: 'b',
            to: '[]  foo bar baz    fum-nom',
        },
        {
            from: '  []foo bar baz    fum-nom',
            inputs: 'b',
            to: '[]  foo bar baz    fum-nom',
        },
        {
            from: '  f[]oo bar baz    fum-nom',
            inputs: 'b',
            to: '  []foo bar baz    fum-nom',
        },
        {
            from: '  fo[]o bar baz    fum-nom',
            inputs: 'b',
            to: '  []foo bar baz    fum-nom',
        },
        {
            from: '  foo[] bar baz    fum-nom',
            inputs: 'b',
            to: '  []foo bar baz    fum-nom',
        },
        {
            from: '  foo []bar baz    fum-nom',
            inputs: 'b',
            to: '  []foo bar baz    fum-nom',
        },
        {
            from: '  foo b[]ar baz    fum-nom',
            inputs: 'b',
            to: '  foo []bar baz    fum-nom',
        },
        {
            from: '  foo ba[]r baz    fum-nom',
            inputs: 'b',
            to: '  foo []bar baz    fum-nom',
        },
        {
            from: '  foo bar[] baz    fum-nom',
            inputs: 'b',
            to: '  foo []bar baz    fum-nom',
        },
        {
            from: '  foo bar []baz    fum-nom',
            inputs: 'b',
            to: '  foo []bar baz    fum-nom',
        },
        {
            from: '  foo bar b[]az    fum-nom',
            inputs: 'b',
            to: '  foo bar []baz    fum-nom',
        },
        {
            from: '  foo bar ba[]z    fum-nom',
            inputs: 'b',
            to: '  foo bar []baz    fum-nom',
        },
        {
            from: '  foo bar baz[]    fum-nom',
            inputs: 'b',
            to: '  foo bar []baz    fum-nom',
        },
        {
            from: '  foo bar baz []   fum-nom',
            inputs: 'b',
            to: '  foo bar []baz    fum-nom',
        },
        {
            from: '  foo bar baz  []  fum-nom',
            inputs: 'b',
            to: '  foo bar []baz    fum-nom',
        },
        {
            from: '  foo bar baz   [] fum-nom',
            inputs: 'b',
            to: '  foo bar []baz    fum-nom',
        },
        {
            from: '  foo bar baz    []fum-nom',
            inputs: 'b',
            to: '  foo bar []baz    fum-nom',
        },
        {
            from: '  foo bar baz    f[]um-nom',
            inputs: 'b',
            to: '  foo bar baz    []fum-nom',
        },
        {
            from: '  foo bar baz    fu[]m-nom',
            inputs: 'b',
            to: '  foo bar baz    []fum-nom',
        },
        {
            from: '  foo bar baz    fum[]-nom',
            inputs: 'b',
            to: '  foo bar baz    []fum-nom',
        },
        {
            from: '  foo bar baz    fum-[]nom',
            inputs: 'b',
            to: '  foo bar baz    fum[]-nom',
        },
        {
            from: '  foo bar baz    fum-n[]om',
            inputs: 'b',
            to: '  foo bar baz    fum-[]nom',
        },
        {
            from: '  foo bar baz    fum-no[]m',
            inputs: 'b',
            to: '  foo bar baz    fum-[]nom',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
