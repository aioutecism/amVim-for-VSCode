import * as BlackBox from '../Framework/BlackBox';

suite('Normal: {N} ~', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: '[]Foo bar BaZ',
            inputs: '1 ~',
            to: 'f[]oo bar BaZ',
        },
        {
            from: '[]Foo bar BaZ',
            inputs: '2 ~',
            to: 'fO[]o bar BaZ',
        },
        {
            from: '[]Foo bar BaZ',
            inputs: '3 ~',
            to: 'fOO[] bar BaZ',
        },
        {
            from: '[]Foo bar BaZ',
            inputs: '9 ~',
            to: 'fOO BAR b[]aZ',
        },
        {
            from: '[]Foo bar BaZ',
            inputs: '100 ~',
            to: 'fOO BAR bA[]z',
        },

        {
            from: 'åä[]öŝ-ÅÄÖŜ!',
            inputs: '1 ~',
            to: 'åäÖ[]ŝ-ÅÄÖŜ!',
        },
        {
            from: 'åä[]öŝ-ÅÄÖŜ!',
            inputs: '2 ~',
            to: 'åäÖŜ[]-ÅÄÖŜ!',
        },
        {
            from: 'åä[]öŝ-ÅÄÖŜ!',
            inputs: '4 ~',
            to: 'åäÖŜ-å[]ÄÖŜ!',
        },
        {
            from: 'åä[]öŝ-ÅÄÖŜ!',
            inputs: '100 ~',
            to: 'åäÖŜ-åäöŝ[]!',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
