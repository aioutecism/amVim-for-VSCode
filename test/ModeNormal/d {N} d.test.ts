import * as BlackBox from '../Framework/BlackBox';

suite('Normal: d {N} d', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: 'Fo[]o end\nBar end\nDoo end',
            inputs: 'd 1 d',
            to: '[]Bar end\nDoo end',
        },
        {
            from: 'Fo[]o end\nBar end\nDoo end',
            inputs: 'd 2 d',
            to: '[]Doo end',
        },
        {
            from: 'Fo[]o end\nBar end\nDoo end',
            inputs: 'd 10 d',
            to: '[]',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
