import * as BlackBox from '../Framework/BlackBox';

suite('Normal: {N} f', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: '[]Foo Foo Foo end\nBar end',
            inputs: '2 f space',
            to: 'Foo Foo[] Foo end\nBar end',
        },
        {
            from: '[]Foo Foo Foo end\nBar end',
            inputs: '4 f space',
            to: '[]Foo Foo Foo end\nBar end',
        },
        {
            from: '[]Foo Foo Foo end\nBar end',
            inputs: '2 f F',
            to: 'Foo Foo []Foo end\nBar end',
        },
        {
            from: 'F[]oo Foo Foo end\nBar end',
            inputs: '3 f o',
            to: 'Foo Fo[]o Foo end\nBar end',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
