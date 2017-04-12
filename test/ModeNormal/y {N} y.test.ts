import * as BlackBox from '../Framework/BlackBox';

suite('Normal: y {N} y', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: 'Fo[]o end\nBar end\nDoo end',
            inputs: 'y 1 y p',
            to: 'Foo end\n[]Foo end\nBar end\nDoo end',
        },
        {
            from: 'Fo[]o end\nBar end\nDoo end',
            inputs: 'y 2 y p',
            to: 'Foo end\n[]Foo end\nBar end\nBar end\nDoo end',
        },
        {
            from: 'Fo[]o end\nBar end\nDoo end',
            inputs: 'y 10 y p',
            to: 'Foo end\n[]Foo end\nBar end\nDoo endBar end\nDoo end',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
