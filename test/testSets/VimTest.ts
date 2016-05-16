import {Position, Selection} from 'vscode';

export interface TestSet {
    name: string;
    tests: VimTest[];
}

export interface VimTest {
    name: string;
    inSelections: Selection[];
    inText: string;
    command: string;
    outSelections: Selection[];
    outText: string;
}