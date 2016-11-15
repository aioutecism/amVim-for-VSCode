import * as BlackBox from '../Framework/BlackBox';

suite('Normal: d i w', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: '[]Foo  bar!@#  end',
            inputs: 'd i w',
            to: '[]  bar!@#  end',
        },
        {
            from: 'Fo[]o  bar!@#  end',
            inputs: 'd i w',
            to: '[]  bar!@#  end',
        },
        {
            from: 'Foo[]  bar!@#  end',
            inputs: 'd i w',
            to: 'Foo[]bar!@#  end',
        },
        {
            from: 'Foo [] bar!@#  end',
            inputs: 'd i w',
            to: 'Foo[]bar!@#  end',
        },
        {
            from: 'Foo  []bar!@#  end',
            inputs: 'd i w',
            to: 'Foo  []!@#  end',
        },
        {
            from: 'Foo  ba[]r!@#  end',
            inputs: 'd i w',
            to: 'Foo  []!@#  end',
        },
        {
            from: 'Foo  bar[]!@#  end',
            inputs: 'd i w',
            to: 'Foo  bar[]  end',
        },
        {
            from: 'Foo  bar!@[]#  end',
            inputs: 'd i w',
            to: 'Foo  bar[]  end',
        },
        {
            from: 'Foo  bar!@#[]  end',
            inputs: 'd i w',
            to: 'Foo  bar!@#[]end',
        },
        {
            from: 'Foo  bar!@# [] end',
            inputs: 'd i w',
            to: 'Foo  bar!@#[]end',
        },
        {
            from: 'Foo  bar!@#  []end',
            inputs: 'd i w',
            to: 'Foo  bar!@# [] ',
        },
        {
            from: 'Foo  bar!@#  en[]d',
            inputs: 'd i w',
            to: 'Foo  bar!@# [] ',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});

suite('Normal: d i W', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: '[]Foo  bar!@#  end',
            inputs: 'd i W',
            to: '[]  bar!@#  end',
        },
        {
            from: 'Fo[]o  bar!@#  end',
            inputs: 'd i W',
            to: '[]  bar!@#  end',
        },
        {
            from: 'Foo[]  bar!@#  end',
            inputs: 'd i W',
            to: 'Foo[]bar!@#  end',
        },
        {
            from: 'Foo [] bar!@#  end',
            inputs: 'd i W',
            to: 'Foo[]bar!@#  end',
        },
        {
            from: 'Foo  []bar!@#  end',
            inputs: 'd i W',
            to: 'Foo  []  end',
        },
        {
            from: 'Foo  ba[]r!@#  end',
            inputs: 'd i W',
            to: 'Foo  []  end',
        },
        {
            from: 'Foo  bar[]!@#  end',
            inputs: 'd i W',
            to: 'Foo  []  end',
        },
        {
            from: 'Foo  bar!@[]#  end',
            inputs: 'd i W',
            to: 'Foo  []  end',
        },
        {
            from: 'Foo  bar!@#[]  end',
            inputs: 'd i W',
            to: 'Foo  bar!@#[]end',
        },
        {
            from: 'Foo  bar!@# [] end',
            inputs: 'd i W',
            to: 'Foo  bar!@#[]end',
        },
        {
            from: 'Foo  bar!@#  []end',
            inputs: 'd i W',
            to: 'Foo  bar!@# [] ',
        },
        {
            from: 'Foo  bar!@#  en[]d',
            inputs: 'd i W',
            to: 'Foo  bar!@# [] ',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
