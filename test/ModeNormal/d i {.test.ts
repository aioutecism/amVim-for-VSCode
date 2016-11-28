import * as BlackBox from '../Framework/BlackBox';

suite('Normal: d i {', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: `{[] content }`,
            inputs: 'd i {',
            to: `{[]}`,
        },
        {
            from: `name {[] content }`,
            inputs: 'd i {',
            to: `name {[]}`,
        },
        {
            from: `name {[] content\n}`,
            inputs: 'd i {',
            to: `name {[]}`,
        },
        {
            from: `name {[]\n    content }`,
            inputs: 'd i {',
            to: `name {[]}`,
        },
        {
            from: `name {\n[]    content\n}`,
            inputs: 'd i {',
            to: `name {\n[]}`,
        },
        {
            from: `    name {\n[]        content\n    }`,
            inputs: 'd i {',
            to: `    name {\n[]    }`,
        },
        {
            from: `{\n[]    content\n}`,
            inputs: 'd i {',
            to: `{\n[]}`,
        },
        {
            from: `    {\n[]        content\n    }`,
            inputs: 'd i {',
            to: `    {\n[]    }`,
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
