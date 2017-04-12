import * as BlackBox from '../Framework/BlackBox';

suite('Normal: {N} y y', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: 'Fo[]o end\nBar end\nDoo end',
            inputs: '1 y y p',
            to: 'Foo end\n[]Foo end\nBar end\nDoo end',
        },
        {
            from: 'Fo[]o end\nBar end\nDoo end',
            inputs: '2 y y p',
            to: 'Foo end\n[]Foo end\nBar end\nBar end\nDoo end',
        },
        {
            from: 'Fo[]o end\nBar end\nDoo end',
            inputs: '10 y y p',
            to: 'Foo end\n[]Foo end\nBar end\nDoo endBar end\nDoo end',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
