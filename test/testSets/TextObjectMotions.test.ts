import {Selection} from 'vscode';
import {VimTest, TestSet} from './VimTest';

let testSet: TestSet = {
    name: 'Text Object Motion Tests',
    tests: [
        {
            name: 'w from whitespace',
            inText: ' a',
            command: 'l',
            outSelections: [new Selection(0, 1, 0, 1)]
        },
        {
            name: 'w in middle of word',
            inText: 'a b',
            command: 'w',
            outSelections: [new Selection(0, 2, 0, 2)]
        },
        {
            name: 'w with no more words left',
            inText: 'ab',
            command: 'w',
            outSelections: [new Selection(0, 1, 0, 1)]
        },
        {
            name: 'w to special character',
            inText: 'a.b',
            command: 'w',
            outSelections: [new Selection(0, 1, 0, 1)]
        },
        {
            name: 'w to empty line',
            inText: 'a\n',
            command: 'w',
            outSelections: [new Selection(1, 0, 1, 0)]
        },
        {
            name: 'N w',
            inText: 'a b c',
            command: '2w',
            outSelections: [new Selection(0, 4, 0, 4)]
        },
        {
            name: 'N w with less than N words left',
            inText: 'a b',
            command: '3w',
            outSelections: [new Selection(0, 2, 0, 2)]
        }
    ]
};

export default testSet;