import * as BlackBox from '../Framework/BlackBox';

suite('Visual: <', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: '[f]oo\nbar\nabc',
            inputs: '<',
            to: '[]foo\nbar\nabc',
        },
        {
            from: '  [f]oo\nbar\nabc',
            inputs: '<',
            to: '[]foo\nbar\nabc',
        },
        {
            from: '  [ ] foo\nbar\nabc',
            inputs: '<',
            to: '[]foo\nbar\nabc',
        },
        {
            from: '    f[o]o\nbar\nabc',
            inputs: '<',
            to: '[]foo\nbar\nabc',
        },
        {
            from: '      f[o]o\nbar\nabc',
            inputs: '<',
            to: '    []foo\nbar\nabc',
        },
        {
            from: '      [f]o[o]\nbar\nabc',
            inputs: '<',
            to: '    []foo\nbar\nabc',
        },
        {
            from: '    f[oo\nba]r\nabc',
            inputs: '<',
            to: '[]foo\nbar\nabc',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i], (textEditor) => {
            textEditor.options.insertSpaces = true;
            textEditor.options.tabSize = 4;
        });
    }
});
