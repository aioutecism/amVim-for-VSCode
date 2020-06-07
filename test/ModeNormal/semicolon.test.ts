import * as BlackBox from '../Framework/BlackBox';

suite('Normal: ;', () => {
    const testCases: BlackBox.TestCase[] = [
        // Empty - can only be tested in a fresh document
        //{
        //    from: '[]Foo aaa bbb ccc end\nBar end',
        //    inputs: ';',
        //    to: '[]Foo aaa bbb ccc end\nBar end',
        //},
        // Empty - after no match
        {
            from: '[]Foo aaa bbb ccc end\nBar end',
            inputs: 'f X ;',
            to: '[]Foo aaa bbb ccc end\nBar end',
        },
        // f <char>
        {
            from: '[]Foo aaa bbb ccc end\nBar end',
            inputs: 'f space ;',
            to: 'Foo aaa[] bbb ccc end\nBar end',
        },
        {
            from: 'Foo aaa []bbb ccc end\nBar end',
            inputs: ';',
            to: 'Foo aaa bbb[] ccc end\nBar end',
        },
        {
            from: '[]Foo aaa bbb ccc end\nBar end',
            inputs: '4 ;',
            to: 'Foo aaa bbb ccc[] end\nBar end',
        },
        {
            from: '[]Foo aaa bbb ccc end\nBar end',
            inputs: '10 ;',
            to: '[]Foo aaa bbb ccc end\nBar end',
        },
        // F <char>
        {
            from: 'Foo aaa bbb[] ccc end\nBar end',
            inputs: 'F space ;',
            to: 'Foo[] aaa bbb ccc end\nBar end',
        },
        {
            from: 'Foo aaa bbb[] ccc end\nBar end',
            inputs: ';',
            to: 'Foo aaa[] bbb ccc end\nBar end',
        },
        {
            from: 'Foo aaa bbb ccc en[]d\nBar end',
            inputs: '4 ;',
            to: 'Foo[] aaa bbb ccc end\nBar end',
        },
        {
            from: 'Foo aaa bbb ccc en[]d\nBar end',
            inputs: '10 ;',
            to: 'Foo aaa bbb ccc en[]d\nBar end',
        },
        // t <char>
        {
            from: '[]Foo aaa bbb ccc end\nBar end',
            inputs: 't space ;',
            to: 'Foo aa[]a bbb ccc end\nBar end',
        },
        {
            from: 'Foo aaa []bbb ccc end\nBar end',
            inputs: ';',
            to: 'Foo aaa bb[]b ccc end\nBar end',
        },
        {
            from: '[]Foo aaa bbb ccc end\nBar end',
            inputs: '4 ;',
            to: 'Foo aaa bbb cc[]c end\nBar end',
        },
        {
            from: '[]Foo aaa bbb ccc end\nBar end',
            inputs: '10 ;',
            to: '[]Foo aaa bbb ccc end\nBar end',
        },
        // T <char>
        {
            from: 'Foo aaa bbb[] ccc end\nBar end',
            inputs: 'T space ;',
            to: 'Foo []aaa bbb ccc end\nBar end',
        },
        {
            from: 'Foo aaa bbb[] ccc end\nBar end',
            inputs: ';',
            to: 'Foo aaa []bbb ccc end\nBar end',
        },
        {
            from: 'Foo aaa bbb ccc en[]d\nBar end',
            inputs: '4 ;',
            to: 'Foo []aaa bbb ccc end\nBar end',
        },
        {
            from: 'Foo aaa bbb ccc en[]d\nBar end',
            inputs: '10 ;',
            to: 'Foo aaa bbb ccc en[]d\nBar end',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
