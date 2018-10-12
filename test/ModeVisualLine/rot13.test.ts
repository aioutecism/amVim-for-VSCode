import * as BlackBox from '../Framework/BlackBox';

suite('VisualLine: g ?', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: '[]abcdefghijklmnopqrstuvwxyz',
            inputs: 'V g ?',
            to: '[]nopqrstuvwxyzabcdefghijklm',
        },
        {
            from: '[]ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            inputs: 'V g ?',
            to: '[]NOPQRSTUVWXYZABCDEFGHIJKLM',
        },
        {
            from: 'abcdefghijklm[]nopqrstuvwxyz\nNOPQRSTUVWXYZABCDEFGHIJKLM\nfoo',
            inputs: 'V j g ?',
            to: '[]nopqrstuvwxyzabcdefghijklm\nABCDEFGHIJKLMNOPQRSTUVWXYZ\nfoo',
        },
        {
            from: 'The Quick Brown[] Fox Jumps Over The Lazy Dog.',
            inputs: 'V g ?',
            to: '[]Gur Dhvpx Oebja Sbk Whzcf Bire Gur Ynml Qbt.',
        },
        {
            from: 'Abc[123$%^&*()]def',
            inputs: 'V g ?',
            to: '[]Nop123$%^&*()qrs',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
