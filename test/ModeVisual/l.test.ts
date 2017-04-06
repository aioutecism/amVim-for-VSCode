import * as BlackBox from '../Framework/BlackBox';

suite('Visual: l', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: 'Foo ba~[r]',
            inputs: 'l',
            to: 'Foo ba[r]',
        },
        {
            from: 'Foo b~[a]r',
            inputs: 'l',
            to: 'Foo b[ar]',
        },
        {
            from: 'Foo b~[ar]',
            inputs: 'l',
            to: 'Foo ba~[r]',
        },
        {
            from: 'Foo ba[r]',
            inputs: 'l',
            to: 'Foo ba[r]',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
       BlackBox.run(testCases[i]);
    }
});
