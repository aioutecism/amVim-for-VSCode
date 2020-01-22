import * as BlackBox from '../Framework/BlackBox';

suite.only('Normal: d i t', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: '<[]span>content</span>',
            inputs: 'd i t',
            to: '<span>[]</span>',
        },
        {
            from: '<span[]>content</span>',
            inputs: 'd i t',
            to: '<span>[]</span>',
        },
        {
            from: '<sp[]an>content</span>',
            inputs: 'd i t',
            to: '<span>[]</span>',
        },
        {
            from: '<span>content<[]/span>',
            inputs: 'd i t',
            to: '<span>[]</span>',
        },
        {
            from: '<span>content</[]span>',
            inputs: 'd i t',
            to: '<span>[]</span>',
        },
        {
            from: '<span>content</sp[]an>',
            inputs: 'd i t',
            to: '<span>[]</span>',
        },
        {
            from: '<span>content</span[]>',
            inputs: 'd i t',
            to: '<span>[]</span>',
        },
        {
            from: '<div>\n<span[]>content</span>\n</div>',
            inputs: 'd i t',
            to: '<div>\n<span>[]</span>\n</div>',
        },
        {
            from: '<div>\n<span>content</span[]>\n</div>',
            inputs: 'd i t',
            to: '<div>\n<span>[]</span>\n</div>',
        },
        {
            from: '<div[]>\n<span>content</span>\n</div>',
            inputs: 'd i t',
            to: '<div>[]</div>',
        },
        {
            from: '<div>\n<span>content</span>\n</[]div>',
            inputs: 'd i t',
            to: '<div>[]</div>',
        },
        {
            from: '<div[]><span>content</div></span>',
            inputs: 'd i t',
            to: '<div>[]</div></span>',
        },
        {
            from: '<div>[]<span>content</div></span>',
            inputs: 'd i t',
            to: '<div>[]</div></span>',
        },
        {
            from: '<div><[]span></div></span>',
            inputs: 'd i t',
            to: '<div>[]</div></span>',
        },
        {
            from: '<div><span></div[]></span>',
            inputs: 'd i t',
            to: '<div>[]</div></span>',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
