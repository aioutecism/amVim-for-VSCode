import * as BlackBox from '../Framework/BlackBox';

suite('Normal: r', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: '[]Foo',
            inputs: 'r r',
            to: '[]roo',
        },
        {
            from: 'F[]oo',
            inputs: 'r r',
            to: 'F[]ro',
        },
        {
            from: 'Fo[]o',
            inputs: 'r r',
            to: 'Fo[]r',
        },
        {
            from: '[]Foo',
            inputs: '3 r r',
            to: '[]rrr',
        },
        {
            from: 'Foo []Foo',
            inputs: '3 r r',
            to: 'Foo []rrr',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
