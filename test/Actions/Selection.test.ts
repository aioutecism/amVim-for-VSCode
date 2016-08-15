import * as assert from 'assert';
import * as TestUtil from '../Util';
import {Position, window} from 'vscode';

import {Configuration} from '../../src/Configuration';
import {ActionSelection} from '../../src/Actions/Selection';
import {TextObjectWord} from '../../src/TextObjects/Word';
import {ModeVisual} from '../../src/Modes/Visual';

export function run() {

    Configuration.init();

    test('ActionSelection.expandByTextObject', (done) => {
        TestUtil.createTempDocument('  foo bar baz    fum-nom').then(() => {

            //  0123456789112345678921234
            // '  foo bar baz    fum-nom'
            //  __
            TestUtil.setCursorPosition(new Position(0, 0));

            ActionSelection.expandByTextObject({
                textObject: TextObjectWord.byWord({ useBlankSeparatedStyle: false, isInclusive: false })
            }).then(() => {
                const editor = window.activeTextEditor;
                assert.equal(editor.selections.length, 1);
                assert.equal(editor.selections[0].start.character, 0);
                assert.equal(editor.selections[0].end.character, 2);
                done();
            });
        });
    });
};
