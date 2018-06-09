import * as BlackBox from '../Framework/BlackBox';
import {MotionMatch} from '../../src/Motions/Match';

suite('Normal: ,', () => {
    MotionMatch.clearLast();

    const testCases: BlackBox.TestCase[] = [
        // Empty
        {
            from: 'Foo aaa bbb ccc e[]nd\nBar end',
            inputs: ',',
            to: 'Foo aaa bbb ccc e[]nd\nBar end',
        },
        // f <char>
        {
            from: '[]Foo aaa bbb ccc end\nBar end',
            inputs: 'f space ,',
            to: 'Foo[] aaa bbb ccc end\nBar end',
        },
        {
            from: 'Foo aaa []bbb ccc end\nBar end',
            inputs: ',',
            to: 'Foo aaa[] bbb ccc end\nBar end',
        },
        {
            from: 'Foo aaa bbb ccc []end\nBar end',
            inputs: '4 ,',
            to: 'Foo[] aaa bbb ccc end\nBar end',
        },
        {
            from: 'Foo aaa bbb ccc []end\nBar end',
            inputs: '10 ,',
            to: 'Foo aaa bbb ccc []end\nBar end',
        },
        // F <char>
        {
            from: 'Foo aaa b[]bb ccc end\nBar end',
            inputs: 'F space ,',
            to: 'Foo aaa bbb[] ccc end\nBar end',
        },
        {
            from: 'Foo aaa bbb[] ccc end\nBar end',
            inputs: ',',
            to: 'Foo aaa bbb ccc[] end\nBar end',
        },
        {
            from: '[]Foo aaa bbb ccc end\nBar end',
            inputs: '4 ,',
            to: 'Foo aaa bbb ccc[] end\nBar end',
        },
        {
            from: '[]Foo aaa bbb ccc end\nBar end',
            inputs: '10 ,',
            to: '[]Foo aaa bbb ccc end\nBar end',
        },
        // t <char>
        {
            from: '[]Foo aaa bbb ccc end\nBar end',
            inputs: 't space ,',
            to: 'Fo[]o aaa bbb ccc end\nBar end',
        },
        {
            from: 'Foo aaa []bbb ccc end\nBar end',
            inputs: ',',
            to: 'Foo []aaa bbb ccc end\nBar end',
        },
        {
            from: 'Foo aaa bbb ccc []end\nBar end',
            inputs: '4 ,',
            to: 'Foo []aaa bbb ccc end\nBar end',
        },
        {
            from: 'Foo aaa bbb ccc []end\nBar end',
            inputs: '10 ,',
            to: 'Foo aaa bbb ccc []end\nBar end',
        },
        // T <char>
        {
            from: 'Foo aaa bbb[] ccc end\nBar end',
            inputs: 'T space ,',
            to: 'Foo aaa bb[]b ccc end\nBar end',
        },
        {
            from: 'Foo aaa bbb[] ccc end\nBar end',
            inputs: ',',
            to: 'Foo aaa bbb cc[]c end\nBar end',
        },
        {
            from: 'Fo[]o aaa bbb ccc end\nBar end',
            inputs: '4 ,',
            to: 'Foo aaa bbb cc[]c end\nBar end',
        },
        {
            from: 'Fo[]o aaa bbb ccc end\nBar end',
            inputs: '10 ,',
            to: 'Fo[]o aaa bbb ccc end\nBar end',
        },
    ];

    for (let i = 0; i < testCases.length; i++) {
        BlackBox.run(testCases[i]);
    }
});
