import * as BlackBox from '../Framework/BlackBox';

suite('Normal: d {motion}', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: 'Foo en[]d\nBar end',
            inputs: 'd w',
            to: 'Foo e[]n\nBar end',
        },
        {
            from: 'Foo end\n[]Bar end',
            inputs: 'd b',
            to: 'Foo end\n[]Bar end',
        },
        {
            from: 'Fo[]o end\nBar end',
            inputs: 'd k',
            to: '[]Bar end',
        },
        {
            from: 'Foo end\n[]Bar end',
            inputs: 'd j',
            to: 'Foo en[]d',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
