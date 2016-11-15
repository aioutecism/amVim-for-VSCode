import * as BlackBox from '../Framework/BlackBox';

suite('Normal: d d', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: 'Fo[]o end\nBar end',
            inputs: 'd d',
            to: '[]Bar end',
        },
        {
            from: 'Foo end\n[]Bar end',
            inputs: 'd d',
            to: 'Foo en[]d',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
