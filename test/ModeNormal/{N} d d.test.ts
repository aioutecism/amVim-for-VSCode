import * as BlackBox from '../Framework/BlackBox';

suite('Normal: {N} d d', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: 'Fo[]o end\nBar end\nDoo end',
            inputs: '1 d d',
            to: '[]Bar end\nDoo end',
        },
        {
            from: 'Fo[]o end\nBar end\nDoo end',
            inputs: '2 d d',
            to: '[]Doo end',
        },
        {
            from: 'Fo[]o end\nBar end\nDoo end',
            inputs: '10 d d',
            to: '[]',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
