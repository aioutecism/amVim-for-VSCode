import * as BlackBox from '../Framework/BlackBox';

suite('Normal: g d', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            language: 'javascript',
            from: 'class C {\n  x = 0;\n}\nconst c = new C();\n[]c.x = 1;',
            inputs: 'g d',
            to: 'class C {\n  x = 0;\n}\nconst []c = new C();\nc.x = 1;',
        },
        {
            language: 'javascript',
            from: 'class C {\n  x = 0;\n}\nconst c = new C();\nc.[]x = 1;',
            inputs: 'g d',
            to: 'class C {\n  []x = 0;\n}\nconst c = new C();\nc.x = 1;',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});

suite('Normal: g D', () => {
    const testCases: BlackBox.TestCase[] = [
        {
            language: 'javascript',
            from: 'class C {\n  x = 0;\n}\nconst c = new C();\n[]c.x = 1;',
            inputs: 'g D',
            to: 'class []C {\n  x = 0;\n}\nconst c = new C();\nc.x = 1;',
        },
        {
            language: 'javascript',
            from: 'class C {\n  x = 0;\n}\nconst c = new C();\nc.[]x = 1;',
            inputs: 'g D',
            to: 'class C {\n  x = 0;\n}\nconst c = new C();\nc.[]x = 1;',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
