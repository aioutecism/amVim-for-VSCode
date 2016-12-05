import * as BlackBox from '../Framework/BlackBox';

suite('Normal: d a {', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: `{[] content }`,
            inputs: 'd a {',
            to: `[]`,
        },
        {
            from: `name {[] content }`,
            inputs: 'd a {',
            to: `name[] `,
        },
        {
            from: `name {[] content\n}`,
            inputs: 'd a {',
            to: `name[] `,
        },
        {
            from: `name {[]\n    content }`,
            inputs: 'd a {',
            to: `name[] `,
        },
        {
            from: `name {\n[]    content\n}`,
            inputs: 'd a {',
            to: `name[] `,
        },
        {
            from: `    name {\n[]        content\n    }`,
            inputs: 'd a {',
            to: `    name[] `,
        },
        {
            from: `{\n[]    content\n}`,
            inputs: 'd a {',
            to: `[]`,
        },
        {
            from: `    {\n[]        content\n    }`,
            inputs: 'd a {',
            to: `[]`,
        },
        {
            from: `foo\n{\n[]    content\n}\nbar\n`,
            inputs: 'd a { p',
            to: `foo\nbar\n[]{\n    content\n}\n`,
        },
        {
            from: `    foo\n    {\n[]        content\n    }\n    bar\n`,
            inputs: 'd a { p',
            to: `    foo\n    bar\n    []{\n        content\n    }\n`,
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
