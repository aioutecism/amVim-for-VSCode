import * as BlackBox from '../Framework/BlackBox';

suite('Normal: f', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: '[]Foo end\nBar end',
            inputs: 'f space',
            to: 'Foo[] end\nBar end',
        },
        {
            from: 'Foo[] end\nBar end',
            inputs: 'f space',
            to: 'Foo[] end\nBar end',
        },
        {
            from: 'Foo []end\nBar end',
            inputs: 'f space',
            to: 'Foo []end\nBar end',
        },
        {
            from: 'Foo []end\nBar end',
            inputs: 'f n',
            to: 'Foo e[]nd\nBar end',
        },
        {
            from: '[]Foo end\nBar end',
            inputs: 'f x',
            to: '[]Foo end\nBar end',
        },
        {
            from: 'Foo []end\nBar end',
            inputs: 'F f',
            to: 'Foo []end\nBar end',
        },
        {
            from: 'Foo []end\nBar end',
            inputs: 'F F',
            to: '[]Foo end\nBar end',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
