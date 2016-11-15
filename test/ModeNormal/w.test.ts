import * as BlackBox from '../Framework/BlackBox';

suite('Normal: w', () => {
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

suite('Normal: W', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: '[] <foo-bar> (baz$foo)  bar',
            inputs: 'W',
            to: ' []<foo-bar> (baz$foo)  bar',
        },
        {
            from: ' []<foo-bar> (baz$foo)  bar',
            inputs: 'W',
            to: ' <foo-bar> [](baz$foo)  bar',
        },
        {
            from: ' <[]foo-bar> (baz$foo)  bar',
            inputs: 'W',
            to: ' <foo-bar> [](baz$foo)  bar',
        },
        {
            from: ' <f[]oo-bar> (baz$foo)  bar',
            inputs: 'W',
            to: ' <foo-bar> [](baz$foo)  bar',
        },
        {
            from: ' <fo[]o-bar> (baz$foo)  bar',
            inputs: 'W',
            to: ' <foo-bar> [](baz$foo)  bar',
        },
        {
            from: ' <foo[]-bar> (baz$foo)  bar',
            inputs: 'W',
            to: ' <foo-bar> [](baz$foo)  bar',
        },
        {
            from: ' <foo-[]bar> (baz$foo)  bar',
            inputs: 'W',
            to: ' <foo-bar> [](baz$foo)  bar',
        },
        {
            from: ' <foo-b[]ar> (baz$foo)  bar',
            inputs: 'W',
            to: ' <foo-bar> [](baz$foo)  bar',
        },
        {
            from: ' <foo-ba[]r> (baz$foo)  bar',
            inputs: 'W',
            to: ' <foo-bar> [](baz$foo)  bar',
        },
        {
            from: ' <foo-bar[]> (baz$foo)  bar',
            inputs: 'W',
            to: ' <foo-bar> [](baz$foo)  bar',
        },
        {
            from: ' <foo-bar>[] (baz$foo)  bar',
            inputs: 'W',
            to: ' <foo-bar> [](baz$foo)  bar',
        },
        {
            from: ' <foo-bar> [](baz$foo)  bar',
            inputs: 'W',
            to: ' <foo-bar> (baz$foo)  []bar',
        },
        {
            from: ' <foo-bar> ([]baz$foo)  bar',
            inputs: 'W',
            to: ' <foo-bar> (baz$foo)  []bar',
        },
        {
            from: ' <foo-bar> (b[]az$foo)  bar',
            inputs: 'W',
            to: ' <foo-bar> (baz$foo)  []bar',
        },
        {
            from: ' <foo-bar> (ba[]z$foo)  bar',
            inputs: 'W',
            to: ' <foo-bar> (baz$foo)  []bar',
        },
        {
            from: ' <foo-bar> (baz[]$foo)  bar',
            inputs: 'W',
            to: ' <foo-bar> (baz$foo)  []bar',
        },
        {
            from: ' <foo-bar> (baz$[]foo)  bar',
            inputs: 'W',
            to: ' <foo-bar> (baz$foo)  []bar',
        },
        {
            from: ' <foo-bar> (baz$f[]oo)  bar',
            inputs: 'W',
            to: ' <foo-bar> (baz$foo)  []bar',
        },
        {
            from: ' <foo-bar> (baz$fo[]o)  bar',
            inputs: 'W',
            to: ' <foo-bar> (baz$foo)  []bar',
        },
        {
            from: ' <foo-bar> (baz$foo[])  bar',
            inputs: 'W',
            to: ' <foo-bar> (baz$foo)  []bar',
        },
        {
            from: ' <foo-bar> (baz$foo)[]  bar',
            inputs: 'W',
            to: ' <foo-bar> (baz$foo)  []bar',
        },
        {
            from: ' <foo-bar> (baz$foo) [] bar',
            inputs: 'W',
            to: ' <foo-bar> (baz$foo)  []bar',
        },
        {
            from: ' <foo-bar> (baz$foo)  []bar',
            inputs: 'W',
            to: ' <foo-bar> (baz$foo)  ba[]r',
        },
        {
            from: ' <foo-bar> (baz$foo)  b[]ar',
            inputs: 'W',
            to: ' <foo-bar> (baz$foo)  ba[]r',
        },
        {
            from: ' <foo-bar> (baz$foo)  ba[]r',
            inputs: 'W',
            to: ' <foo-bar> (baz$foo)  ba[]r',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
