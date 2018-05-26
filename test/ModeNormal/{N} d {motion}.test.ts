import * as BlackBox from '../Framework/BlackBox';

suite('Normal: {N} d {motion}', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: 'F[]oo bar end\n',
            inputs: '1 d f space',
            to: 'F[]bar end\n',
        },
        {
            from: 'F[]oo bar end\n',
            inputs: '2 d f space',
            to: 'F[]end\n',
        },
        {
            from: 'F[]oo bar end\n',
            inputs: '10 d f space',
            to: 'F[]oo bar end\n',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
