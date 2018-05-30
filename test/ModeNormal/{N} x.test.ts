import * as BlackBox from '../Framework/BlackBox';

suite('Normal: {N} x', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: 'Fo[]o end\nBar end\nDoo end',
            inputs: '1 x',
            to: 'Fo[] end\nBar end\nDoo end',
        },
        {
            from: 'Fo[]o end\nBar end\nDoo end',
            inputs: '2 x',
            to: 'Fo[]end\nBar end\nDoo end',
        },
        {
            from: 'Fo[]o end\nBar end\nDoo end',
            inputs: '10 x',
            to: 'F[]o\nBar end\nDoo end',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});

suite('Normal: {N} X', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: 'Fo[]o end\nBar end\nDoo end',
            inputs: '1 X',
            to: 'F[]o end\nBar end\nDoo end',
        },
        {
            from: 'Fo[]o end\nBar end\nDoo end',
            inputs: '2 X',
            to: '[]o end\nBar end\nDoo end',
        },
        {
            from: 'Foo en[]d\nBar end\nDoo end',
            inputs: '10 X',
            to: '[]d\nBar end\nDoo end',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
