import * as BlackBox from '../Framework/BlackBox';

suite('Normal: J', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: 'Foo end[]\nBar end',
            inputs: 'J',
            to: 'Foo end[] Bar end',
        },
        {
            from: 'Foo[] end\nBar end',
            inputs: 'J',
            to: 'Foo end[] Bar end',
        },
        {
            from: '[]Foo end\nBar end',
            inputs: 'J',
            to: 'Foo end[] Bar end',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
