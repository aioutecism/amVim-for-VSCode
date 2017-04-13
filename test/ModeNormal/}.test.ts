import * as BlackBox from '../Framework/BlackBox';

suite('Normal: }', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: '[]\n\n\nFoo end\nBar end\n\n\nDoo end\n\n\n',
            inputs: '}',
            to: '\n\n\nFoo end\nBar end\n[]\n\nDoo end\n\n\n',
        },
        {
            from: '\n[]\n\nFoo end\nBar end\n\n\nDoo end\n\n\n',
            inputs: '}',
            to: '\n\n\nFoo end\nBar end\n[]\n\nDoo end\n\n\n',
        },
        {
            from: '\n\n[]\nFoo end\nBar end\n\n\nDoo end\n\n\n',
            inputs: '}',
            to: '\n\n\nFoo end\nBar end\n[]\n\nDoo end\n\n\n',
        },
        {
            from: '\n\n\n[]Foo end\nBar end\n\n\nDoo end\n\n\n',
            inputs: '}',
            to: '\n\n\nFoo end\nBar end\n[]\n\nDoo end\n\n\n',
        },
        {
            from: '\n\n\nFoo end\n[]Bar end\n\n\nDoo end\n\n\n',
            inputs: '}',
            to: '\n\n\nFoo end\nBar end\n[]\n\nDoo end\n\n\n',
        },
        {
            from: '\n\n\nFoo end\nBar end\n[]\n\nDoo end\n\n\n',
            inputs: '}',
            to: '\n\n\nFoo end\nBar end\n\n\nDoo end\n[]\n\n',
        },
        {
            from: '\n\n\nFoo end\nBar end\n\n[]\nDoo end\n\n\n',
            inputs: '}',
            to: '\n\n\nFoo end\nBar end\n\n\nDoo end\n[]\n\n',
        },
        {
            from: '\n\n\nFoo end\nBar end\n\n\n[]Doo end\n\n\n',
            inputs: '}',
            to: '\n\n\nFoo end\nBar end\n\n\nDoo end\n[]\n\n',
        },
        {
            from: '\n\n\nFoo end\nBar end\n\n\nDoo end\n[]\n\n',
            inputs: '}',
            to: '\n\n\nFoo end\nBar end\n\n\nDoo end\n\n\n[]',
        },
        {
            from: '\n\n\nFoo end\nBar end\n\n\nDoo end\n\n[]\n',
            inputs: '}',
            to: '\n\n\nFoo end\nBar end\n\n\nDoo end\n\n\n[]',
        },
        {
            from: 'Foo end\n[]\nBar end\nDoo end',
            inputs: '}',
            to: 'Foo end\n\nBar end\nDoo en[]d',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
