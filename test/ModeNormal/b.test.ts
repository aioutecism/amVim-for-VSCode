import * as BlackBox from '../Framework/BlackBox';

suite('Normal: b', () => {
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

suite('Normal: B', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: '[] <foo-bar> (baz$foo)  bar',
            inputs: 'B',
            to: '[] <foo-bar> (baz$foo)  bar',
        },
        {
            from: ' []<foo-bar> (baz$foo)  bar',
            inputs: 'B',
            to: '[] <foo-bar> (baz$foo)  bar',
        },
        {
            from: ' <[]foo-bar> (baz$foo)  bar',
            inputs: 'B',
            to: ' []<foo-bar> (baz$foo)  bar',
        },
        {
            from: ' <f[]oo-bar> (baz$foo)  bar',
            inputs: 'B',
            to: ' []<foo-bar> (baz$foo)  bar',
        },
        {
            from: ' <fo[]o-bar> (baz$foo)  bar',
            inputs: 'B',
            to: ' []<foo-bar> (baz$foo)  bar',
        },
        {
            from: ' <foo[]-bar> (baz$foo)  bar',
            inputs: 'B',
            to: ' []<foo-bar> (baz$foo)  bar',
        },
        {
            from: ' <foo-[]bar> (baz$foo)  bar',
            inputs: 'B',
            to: ' []<foo-bar> (baz$foo)  bar',
        },
        {
            from: ' <foo-b[]ar> (baz$foo)  bar',
            inputs: 'B',
            to: ' []<foo-bar> (baz$foo)  bar',
        },
        {
            from: ' <foo-ba[]r> (baz$foo)  bar',
            inputs: 'B',
            to: ' []<foo-bar> (baz$foo)  bar',
        },
        {
            from: ' <foo-bar[]> (baz$foo)  bar',
            inputs: 'B',
            to: ' []<foo-bar> (baz$foo)  bar',
        },
        {
            from: ' <foo-bar>[] (baz$foo)  bar',
            inputs: 'B',
            to: ' []<foo-bar> (baz$foo)  bar',
        },
        {
            from: ' <foo-bar> [](baz$foo)  bar',
            inputs: 'B',
            to: ' []<foo-bar> (baz$foo)  bar',
        },
        {
            from: ' <foo-bar> ([]baz$foo)  bar',
            inputs: 'B',
            to: ' <foo-bar> [](baz$foo)  bar',
        },
        {
            from: ' <foo-bar> (b[]az$foo)  bar',
            inputs: 'B',
            to: ' <foo-bar> [](baz$foo)  bar',
        },
        {
            from: ' <foo-bar> (ba[]z$foo)  bar',
            inputs: 'B',
            to: ' <foo-bar> [](baz$foo)  bar',
        },
        {
            from: ' <foo-bar> (baz[]$foo)  bar',
            inputs: 'B',
            to: ' <foo-bar> [](baz$foo)  bar',
        },
        {
            from: ' <foo-bar> (baz$[]foo)  bar',
            inputs: 'B',
            to: ' <foo-bar> [](baz$foo)  bar',
        },
        {
            from: ' <foo-bar> (baz$f[]oo)  bar',
            inputs: 'B',
            to: ' <foo-bar> [](baz$foo)  bar',
        },
        {
            from: ' <foo-bar> (baz$fo[]o)  bar',
            inputs: 'B',
            to: ' <foo-bar> [](baz$foo)  bar',
        },
        {
            from: ' <foo-bar> (baz$foo[])  bar',
            inputs: 'B',
            to: ' <foo-bar> [](baz$foo)  bar',
        },
        {
            from: ' <foo-bar> (baz$foo)[]  bar',
            inputs: 'B',
            to: ' <foo-bar> [](baz$foo)  bar',
        },
        {
            from: ' <foo-bar> (baz$foo) [] bar',
            inputs: 'B',
            to: ' <foo-bar> [](baz$foo)  bar',
        },
        {
            from: ' <foo-bar> (baz$foo)  []bar',
            inputs: 'B',
            to: ' <foo-bar> [](baz$foo)  bar',
        },
        {
            from: ' <foo-bar> (baz$foo)  b[]ar',
            inputs: 'B',
            to: ' <foo-bar> (baz$foo)  []bar',
        },
        {
            from: ' <foo-bar> (baz$foo)  ba[]r',
            inputs: 'B',
            to: ' <foo-bar> (baz$foo)  []bar',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
