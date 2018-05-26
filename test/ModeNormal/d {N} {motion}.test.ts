import * as BlackBox from '../Framework/BlackBox';

suite('Normal: d {N} {motion}', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: 'F[]oo bar end\n',
            inputs: 'd 1 f space',
            to: 'F[]bar end\n',
        },
        {
            from: 'F[]oo bar end\n',
            inputs: 'd 2 f space',
            to: 'F[]end\n',
        },
        {
            from: 'F[]oo bar end\n',
            inputs: 'd 10 f space',
            to: 'F[]oo bar end\n',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
