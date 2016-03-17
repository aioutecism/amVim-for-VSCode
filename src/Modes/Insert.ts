import {commands} from 'vscode';
import {Configuration} from '../Configuration';
import {Mode, ModeID} from './Mode';
import * as Keys from '../Keys';
import {CommandMap} from '../Mappers/Command';
import {ActionInsert} from '../Actions/Insert';
import {ActionDelete} from '../Actions/Delete';
import {ActionSuggestion} from '../Actions/Suggestion';
import {ActionSelection} from '../Actions/Selection';
import {ActionMode} from '../Actions/Mode';
import {MotionWord} from '../Motions/Word';
import {MotionLine} from '../Motions/Line';

export class ModeInsert extends Mode {

    id = ModeID.INSERT;
    name = 'INSERT';

    private maps: CommandMap[] = [
        { keys: 'space', command: ActionInsert.characterAtSelections, args: {character: ' '} },
        { keys: 'enter', command: ActionInsert.lineBreakAtSelections },
        { keys: 'tab', command: ActionInsert.tabAtSelections },
        { keys: 'backspace', command: ActionDelete.selectionsOrLeft, args: {isMultiLine: true} },
        { keys: 'delete', command: ActionDelete.selectionsOrRight, args: {isMultiLine: true} },

        { keys: 'ctrl+w', command: () => ActionDelete.byMotions({motions: [MotionWord.prevStart()]}) },
        { keys: 'ctrl+u', command: () => ActionDelete.byMotions({motions: [MotionLine.firstNonBlank()]}) },

        { keys: 'ctrl+c', command: () => Configuration.getExtensionSetting<boolean>('bindCtrlC')
            ? ActionSuggestion.hide()
                .then(() => ActionSelection.shrinkAStep())
                .then((isShrinked) => {
                    return isShrinked ? Promise.resolve(true) : ActionMode.toNormal();
                })
            : commands.executeCommand('editor.action.clipboardCopyAction')
        },
        { keys: 'escape', command: () => ActionSuggestion.hide()
            .then(() => ActionSelection.shrinkAStep())
            .then((isShrinked) => {
                return isShrinked ? Promise.resolve(true) : ActionMode.toNormal();
            })
        },
    ]
        .concat([].concat(
            Keys.alphabets,
            Keys.numbers
        ).map(key => {
            return { keys: key, command: ActionInsert.characterAtSelections, args: {character: key} };
        }));

    constructor() {
        super();

        this.maps.forEach(map => {
            this.mapper.map(map.keys, map.command, map.args);
        });
    }

}
