import * as BlackBox from '../Framework/BlackBox';

suite('Visual: g ?', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: 'abcdefghijklm[nopqrstuvwxyz]',
            inputs: 'g ?',
            to: 'abcdefghijklm[]abcdefghijklm',
        },
        {
            from: 'AB[CDE]FG',
            inputs: 'g ?',
            to: 'AB[]PQRFG',
        },
        {
            from: 'The Quick Brown[ Fox Jumps Ov]er The Lazy Dog.',
            inputs: 'g ?',
            to: 'The Quick Brown[] Sbk Whzcf Bier The Lazy Dog.',
        },
        {
            from: 'Abc[123$%^&*()]def',
            inputs: 'g ?',
            to: 'Abc[]123$%^&*()def',
        },
        {
            from: 'Bacon\nips[um,\nDOLO]R\nsit.',
            inputs: 'g ?',
            to: 'Bacon\nips[]hz,\nQBYBR\nsit.',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
