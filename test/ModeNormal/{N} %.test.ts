import * as BlackBox from '../Framework/BlackBox';

suite('Normal: {N} %', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            from: '0\n1\n2\n[]3\n4\n5\n6\n7\n8\n9',
            inputs: '1 %',
            to: '[]0\n1\n2\n3\n4\n5\n6\n7\n8\n9',
        },
        {
            from: '[]0\n1\n2\n3\n4\n5\n6\n7\n8\n9',
            inputs: '60 %',
            to: '0\n1\n2\n3\n4\n[]5\n6\n7\n8\n9',
        },
        {
            from: '[]0\n1\n2\n3\n4\n5\n6\n7\n8\n9',
            inputs: '100 %',
            to: '0\n1\n2\n3\n4\n5\n6\n7\n8\n[]9',
        },
        {
            from: '[]0\n1\n2\n3\n4\n5\n6\n7\n8\n9',
            inputs: '99999 %',
            to: '0\n1\n2\n3\n4\n5\n6\n7\n8\n[]9',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
