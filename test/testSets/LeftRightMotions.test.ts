import {Selection} from 'vscode';
import {VimTest, TestSet} from './VimTest';

let testSet: TestSet = {
    name: 'Left Right Motion Tests',
    tests: [
        {
            name: 'l at beginning of line',
            inText: 'abc',
            command: 'l',
            outSelections: [new Selection(0, 1, 0, 1)]
        },
        {
            name: 'l at end of line',
            inSelections: [new Selection(0, 2, 0, 2)],
            inText: 'abc',
            command: 'l'
        }
    ]
};

export default testSet;