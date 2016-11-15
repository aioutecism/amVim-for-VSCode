import * as BlackBox from '../../BlackBox';

suite('MotionWord: Next start with blank separated style', () => {
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

suite('MotionWord: Next end with blank separated style', () => {
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

suite('MotionWord: Prev start with blank separated style', () => {
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
