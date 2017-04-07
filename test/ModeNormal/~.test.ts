import * as BlackBox from '../Framework/BlackBox';

suite('Normal: ~', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: '[]Foo',
            inputs: '~',
            to: 'f[]oo',
        },
        {
            from: 'f[]oo',
            inputs: '~',
            to: 'fO[]o',
        },
        {
            from: 'fO[]o',
            inputs: '~',
            to: 'fO[]O',
        },
        {
            from: '[]åäö',
            inputs: '~',
            to: 'Å[]äö',
        },
        {
            from: 'Å[]äö',
            inputs: '~',
            to: 'ÅÄ[]ö',
        },
        {
            from: 'ÅÄ[]ö',
            inputs: '~',
            to: 'ÅÄ[]Ö',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
