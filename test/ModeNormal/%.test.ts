import * as BlackBox from '../Framework/BlackBox';

suite('Normal: %', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: '[]Foo {end\nBar} end',
            inputs: '%',
            to: 'Foo {end\nBar[]} end',
        },
        {
            from: 'Foo {end\nBar[]} end',
            inputs: '%',
            to: 'Foo []{end\nBar} end',
        },
        {
            from: 'Foo (e[]nd Bar) end',
            inputs: '%',
            to: 'Foo [](end Bar) end',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
