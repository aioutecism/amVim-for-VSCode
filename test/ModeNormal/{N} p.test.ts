import * as BlackBox from '../Framework/BlackBox';

suite('Normal: {N} p', () => {
    const testCases: BlackBox.TestCase[] = [
        // linewise
        {
            from: 'Fo[]o end\nBar end',
            inputs: 'y y 1 p',
            to: 'Foo end\n[]Foo end\nBar end',
        },
        {
            from: 'Fo[]o end\nBar end',
            inputs: 'y y 2 p',
            to: 'Foo end\n[]Foo end\nFoo end\nBar end',
        },
        // single line
        {
            from: '[Foo] end\nBar end',
            inputs: 'y 1 p',
            to: 'FFo[]ooo end\nBar end',
        },
        {
            from: '[Foo] end\nBar end',
            inputs: 'y 2 p',
            to: 'FFooFo[]ooo end\nBar end',
        },
        // multiple line
        {
            from: '[Foo end\nBar] end',
            inputs: 'y 1 p',
            to: 'F[]Foo end\nBaroo end\nBar end',
        },
        {
            from: '[Foo end\nBar] end',
            inputs: 'y 2 p',
            to: 'F[]Foo end\nBarFoo end\nBaroo end\nBar end',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});

suite('Normal: {N} P', () => {
    const testCases: BlackBox.TestCase[] = [
        // linewise
        {
            from: 'Fo[]o end\nBar end',
            inputs: 'y y 1 P',
            to: '[]Foo end\nFoo end\nBar end',
        },
        {
            from: 'Fo[]o end\nBar end',
            inputs: 'y y 2 P',
            to: '[]Foo end\nFoo end\nFoo end\nBar end',
        },
        // single line
        {
            from: 'Foo [end]\nBar end',
            inputs: 'y 1 P',
            to: 'Foo en[]dend\nBar end',
        },
        {
            from: 'Foo [end]\nBar end',
            inputs: 'y 2 P',
            to: 'Foo enden[]dend\nBar end',
        },
        // multiple line
        {
            from: 'Foo [end\nBar] end',
            inputs: 'y 1 P',
            to: 'Foo []end\nBarend\nBar end',
        },
        {
            from: 'Foo [end\nBar] end',
            inputs: 'y 2 P',
            to: 'Foo []end\nBarend\nBarend\nBar end',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
