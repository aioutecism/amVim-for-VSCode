import * as BlackBox from '../Framework/BlackBox';

suite('VisualLine: Y', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: '[]Foo end\nBar end',
            inputs: 'V Y p',
            to: 'Foo end\n[]Foo end\nBar end',
        },
        {
            from: '[]Foo end\nBar end\n',
            inputs: 'V j Y p',
            to: 'Foo end\n[]Foo end\nBar end\nBar end\n',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
