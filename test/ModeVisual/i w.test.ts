import * as BlackBox from '../Framework/BlackBox';

suite('Visual: i w', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: '[F]oo  bar!@#  end',
            inputs: 'i w',
            to: '[Foo]  bar!@#  end',
        },
        {
            from: 'F[o]o  bar!@#  end',
            inputs: 'i w',
            to: '[Foo]  bar!@#  end',
        },
        {
            from: 'Foo  b[ar!@]#  end',
            inputs: 'i w',
            to: 'Foo  b[ar!@#]  end',
        },
        {
            from: 'Foo  b~[ar!@]#  end',
            inputs: 'i w',
            to: 'Foo  ~[bar!@]#  end',
        },
        {
            from: 'Foo  ~[bar!@]#  end',
            inputs: 'i w',
            to: 'Foo~[  bar!@]#  end',
        },
        {
            from: 'F~[o]o  bar!@#  end',
            inputs: 'i w',
            to: '~[Foo]  bar!@#  end',
        },
        {
            from: '~[F]oo  bar!@#  end',
            inputs: 'i w',
            to: '~[Foo]  bar!@#  end',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
