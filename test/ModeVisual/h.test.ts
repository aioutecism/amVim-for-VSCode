import * as BlackBox from '../Framework/BlackBox';

suite('Visual: h', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: '[F]oo bar',
            inputs: 'h',
            to: '[F]oo bar',
        },
        {
            from: 'F[o]o bar',
            inputs: 'h',
            to: '~[Fo]o bar',
        },
        {
            from: '[Fo]o bar',
            inputs: 'h',
            to: '[F]oo bar',
        },
        {
            from: '~[F]oo bar',
            inputs: 'h',
            to: '~[F]oo bar',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
       BlackBox.run(testCases[i]);
    }
});
