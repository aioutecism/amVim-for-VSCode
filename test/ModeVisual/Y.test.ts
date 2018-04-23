import * as BlackBox from '../Framework/BlackBox';

suite('Visual: Y', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: 'Fo[o e]nd\nBar end',
            inputs: 'Y',
            to: '[]Foo end\nBar end',
        },
        {
            from: 'Fo[o e]nd\nBar end',
            inputs: 'Y p',
            to: 'Foo end\n[]Foo end\nBar end',
        },
        {
            from: 'Fo[o end\nBar] end\n',
            inputs: 'Y p',
            to: 'Foo end\n[]Foo end\nBar end\nBar end\n',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
