import * as BlackBox from '../Framework/BlackBox';

suite('Normal: y y', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: 'Fo[]o end\nBar end',
            inputs: 'y y p',
            to: 'Foo end\n[]Foo end\nBar end',
        },
        {
            from: 'Foo end\n[]Bar end',
            inputs: 'y y p',
            to: 'Foo end\nBar end\n[]Bar end',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
