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
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
