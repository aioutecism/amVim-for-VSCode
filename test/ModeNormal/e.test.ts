import * as BlackBox from '../Framework/BlackBox';

suite('Normal: e', () => {
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

suite('Normal: E', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: '[] <foo-bar> (baz$foo)  bar',
            inputs: 'E',
            to: ' <foo-bar[]> (baz$foo)  bar',
        },
        {
            from: ' []<foo-bar> (baz$foo)  bar',
            inputs: 'E',
            to: ' <foo-bar[]> (baz$foo)  bar',
        },
        {
            from: ' <[]foo-bar> (baz$foo)  bar',
            inputs: 'E',
            to: ' <foo-bar[]> (baz$foo)  bar',
        },
        {
            from: ' <f[]oo-bar> (baz$foo)  bar',
            inputs: 'E',
            to: ' <foo-bar[]> (baz$foo)  bar',
        },
        {
            from: ' <fo[]o-bar> (baz$foo)  bar',
            inputs: 'E',
            to: ' <foo-bar[]> (baz$foo)  bar',
        },
        {
            from: ' <foo[]-bar> (baz$foo)  bar',
            inputs: 'E',
            to: ' <foo-bar[]> (baz$foo)  bar',
        },
        {
            from: ' <foo-[]bar> (baz$foo)  bar',
            inputs: 'E',
            to: ' <foo-bar[]> (baz$foo)  bar',
        },
        {
            from: ' <foo-b[]ar> (baz$foo)  bar',
            inputs: 'E',
            to: ' <foo-bar[]> (baz$foo)  bar',
        },
        {
            from: ' <foo-ba[]r> (baz$foo)  bar',
            inputs: 'E',
            to: ' <foo-bar[]> (baz$foo)  bar',
        },
        {
            from: ' <foo-bar[]> (baz$foo)  bar',
            inputs: 'E',
            to: ' <foo-bar> (baz$foo[])  bar',
        },
        {
            from: ' <foo-bar>[] (baz$foo)  bar',
            inputs: 'E',
            to: ' <foo-bar> (baz$foo[])  bar',
        },
        {
            from: ' <foo-bar> [](baz$foo)  bar',
            inputs: 'E',
            to: ' <foo-bar> (baz$foo[])  bar',
        },
        {
            from: ' <foo-bar> ([]baz$foo)  bar',
            inputs: 'E',
            to: ' <foo-bar> (baz$foo[])  bar',
        },
        {
            from: ' <foo-bar> (b[]az$foo)  bar',
            inputs: 'E',
            to: ' <foo-bar> (baz$foo[])  bar',
        },
        {
            from: ' <foo-bar> (ba[]z$foo)  bar',
            inputs: 'E',
            to: ' <foo-bar> (baz$foo[])  bar',
        },
        {
            from: ' <foo-bar> (baz[]$foo)  bar',
            inputs: 'E',
            to: ' <foo-bar> (baz$foo[])  bar',
        },
        {
            from: ' <foo-bar> (baz$[]foo)  bar',
            inputs: 'E',
            to: ' <foo-bar> (baz$foo[])  bar',
        },
        {
            from: ' <foo-bar> (baz$f[]oo)  bar',
            inputs: 'E',
            to: ' <foo-bar> (baz$foo[])  bar',
        },
        {
            from: ' <foo-bar> (baz$fo[]o)  bar',
            inputs: 'E',
            to: ' <foo-bar> (baz$foo[])  bar',
        },
        {
            from: ' <foo-bar> (baz$foo[])  bar',
            inputs: 'E',
            to: ' <foo-bar> (baz$foo)  ba[]r',
        },
        {
            from: ' <foo-bar> (baz$foo)[]  bar',
            inputs: 'E',
            to: ' <foo-bar> (baz$foo)  ba[]r',
        },
        {
            from: ' <foo-bar> (baz$foo) [] bar',
            inputs: 'E',
            to: ' <foo-bar> (baz$foo)  ba[]r',
        },
        {
            from: ' <foo-bar> (baz$foo)  []bar',
            inputs: 'E',
            to: ' <foo-bar> (baz$foo)  ba[]r',
        },
        {
            from: ' <foo-bar> (baz$foo)  b[]ar',
            inputs: 'E',
            to: ' <foo-bar> (baz$foo)  ba[]r',
        },
        {
            from: ' <foo-bar> (baz$foo)  ba[]r',
            inputs: 'E',
            to: ' <foo-bar> (baz$foo)  ba[]r',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
