import {window, commands, Disposable, TextEditorRevealType} from 'vscode';
import {Configuration} from '../Configuration';
import {Mode, ModeID} from './Mode';
import {CommandMap} from '../Mappers/Command';
import {ActionBlockCursor} from '../Actions/BlockCursor';
import {ActionMoveCursor} from '../Actions/MoveCursor';
import {ActionInsert} from '../Actions/Insert';
import {ActionDelete} from '../Actions/Delete';
import {ActionReplace} from '../Actions/Replace';
import {ActionRegister} from '../Actions/Register';
import {ActionReveal} from '../Actions/Reveal';
import {ActionSuggestion} from '../Actions/Suggestion';
import {ActionJoinLines} from '../Actions/JoinLines';
import {ActionFind} from '../Actions/Find';
import {ActionSelection} from '../Actions/Selection';
import {ActionHistory} from '../Actions/History';
import {ActionIndent} from '../Actions/Indent';
import {ActionMode} from '../Actions/Mode';
import {Motion} from '../Motions/Motion';
import {MotionCharacter} from '../Motions/Character';
import {MotionLine} from '../Motions/Line';
import {MotionMatchPairs} from '../Motions/MatchPairs';
import {MotionPairsDirection} from '../Motions/MatchPairs';
import {LastCharacterMatching} from '../Motions/MatchPairs';
import {FirstPosPairMatching} from '../Motions/MatchPairs';

export class ModeNormal extends Mode {

    id = ModeID.NORMAL;
    name = 'NORMAL';

    private maps: CommandMap[] = [
        { keys: '{motion}', command: ActionMoveCursor.byMotions, args: {noEmptyAtLineEnd: true} },

        { keys: 'i', command: ActionMode.toInsert },
        { keys: 'I', command: () => ActionMoveCursor.byMotions({motions: [MotionLine.firstNonBlank()]}).then(() => ActionMode.toInsert()) },
        { keys: 'a', command: () => ActionMoveCursor.byMotions({motions: [MotionCharacter.right()]}).then(() => ActionMode.toInsert()) },
        { keys: 'A', command: () => ActionMoveCursor.byMotions({motions: [MotionLine.end()]}).then(() => ActionMode.toInsert()) },

        { keys: 'o', command: () => ActionInsert.newLineAfter().then(() => ActionMode.toInsert()) },
        { keys: 'O', command: () => ActionInsert.newLineBefore().then(() => ActionMode.toInsert()) },

        { keys: 's', command: () => ActionDelete.selectionsOrRight({shouldYank: true}).then(() => ActionMode.toInsert()) },

        { keys: 'X', command: () => ActionDelete.selectionsOrLeft({shouldYank: true}).then(() => ActionSuggestion.hide()) },
        { keys: 'x', command: () => ActionDelete.selectionsOrRight({shouldYank: true}).then(() => ActionSuggestion.hide()) },
        { keys: 'delete', command: () => ActionDelete.selectionsOrRight({shouldYank: true}).then(() => ActionSuggestion.hide()) },
        { keys: 'd d', command: ActionDelete.line, args: {shouldYank: true} },
        { keys: 'D', command: () => ActionDelete.byMotions({motions: [MotionLine.end()], shouldYank: true}) },
        { keys: 'd {motion}', command: ActionDelete.byMotions, args: {shouldYank: true} },
        { keys: 'C', command: () => ActionDelete.byMotions({motions: [MotionLine.end()], shouldYank: true}).then(() => ActionMode.toInsert()) },
        { keys: 'c c', command: () => {
            return ActionMoveCursor.byMotions({motions: [MotionLine.firstNonBlank()]})
                .then(ActionDelete.byMotions.bind(undefined, {motions: [MotionLine.end()], shouldYank: true}))
                .then(() => ActionMode.toInsert());
        } },
        { keys: 'c i {char}', 
            command: (args: {character: string}) => 
                ActionMoveCursor.byMotions({motions: [ MotionMatchPairs.matchOpening(args, LastCharacterMatching.Exclude, FirstPosPairMatching.Ignore) ]})  
                //we should not apply the delete move is the first cursor move is invalid.
                //for now, this implementation leads to issue like this (cursor : -)
                // 11111"22222"
                //  -
                //when we enter ci"
                //leads to 
                // 1"22222"
                //  - 
                .then(() => ActionDelete.byMotions({motions: [MotionMatchPairs.matchClosing(args, LastCharacterMatching.Include, FirstPosPairMatching.Notice)], shouldYank: true})) 
                .then(() => ActionMode.toInsert())
        },
        { keys: 'S', command: () => {
            return ActionMoveCursor.byMotions({motions: [MotionLine.firstNonBlank()]})
                .then(ActionDelete.byMotions.bind(undefined, {motions: [MotionLine.end()], shouldYank: true}))
                .then(() => ActionMode.toInsert());
        } },
        { keys: 'c {motion}', command: (args: {motions: Motion[], shouldYank?: boolean}) => ActionDelete.byMotions(args).then(() => ActionMode.toInsert()), args: {shouldYank: true, cwNeedsFixup: true} },
        { keys: 'J', command: ActionJoinLines.onSelections },

        { keys: 'r {char}', command: ActionReplace.characters },

        { keys: 'y y', command: ActionRegister.yankLines },
        { keys: 'Y', command: ActionRegister.yankLines },
        { keys: 'y {motion}', command: ActionRegister.yankByMotions },
        { keys: 'p', command: ActionRegister.putAfter },
        { keys: 'P', command: ActionRegister.putBefore },

        { keys: 'n', command: ActionFind.next },
        { keys: 'N', command: ActionFind.prev },
        { keys: '*', command: () => ActionFind.byIndicator().then(() => ActionFind.next()) },
        { keys: '#', command: () => ActionFind.byIndicator().then(() => ActionFind.prev()) },

        { keys: 'u', command: ActionHistory.undo },
        { keys: 'ctrl+r', command: ActionHistory.redo },

        { keys: '< <', command: ActionIndent.decrease },
        { keys: '> >', command: ActionIndent.increase },

        { keys: '/', command: ActionFind.focusFindWidget },

        { keys: 'v', command: ActionMode.toVisual },
        { keys: 'V', command: ActionMode.toVisualLine },

        { keys: 'z .', command: ActionReveal.primaryCursor, args: {revealType: TextEditorRevealType.InCenter} },
        { keys: 'z z', command: ActionReveal.primaryCursor, args: {revealType: TextEditorRevealType.InCenter} },

        { keys: 'ctrl+c', command: () => ActionSuggestion.hide().then(() => ActionSelection.shrinkToPrimaryActive()) },
        { keys: 'escape', command: () => ActionSuggestion.hide().then(() => ActionSelection.shrinkToPrimaryActive()) },
    ];

    constructor() {
        super();

        this.maps.forEach(map => {
            this.mapper.map(map.keys, map.command, map.args);
        });

        // TODO: No empty at line end when changing selections by mouse
    }

    enter(): void {
        super.enter();

        ActionBlockCursor.on();
    }

    exit(): void {
        super.exit();

        ActionBlockCursor.off();
    }

}
