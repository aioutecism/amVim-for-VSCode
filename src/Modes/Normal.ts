import {window, commands, Disposable, TextEditorRevealType} from 'vscode';
import {Configuration} from '../Configuration';
import {Mode, ModeID} from './Mode';
import {CommandMap} from '../Mappers/Command';
import {ActionBlockCursor} from '../Actions/BlockCursor';
import {ActionMoveCursor} from '../Actions/MoveCursor';
import {ActionPage} from '../Actions/Page';
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

export class ModeNormal extends Mode {

    id = ModeID.NORMAL;
    name = 'NORMAL';

    private maps: CommandMap[] = [
        { keys: '{motion}', actions: [ActionMoveCursor.byMotions], args: {noEmptyAtLineEnd: true} },

        { keys: 'ctrl+b', actions: [ActionPage.up] },
        { keys: 'ctrl+f', actions: [ActionPage.down] },

        { keys: 'i', actions: [ActionMode.toInsert] },
        { keys: 'I', actions: [
            () => ActionMoveCursor.byMotions({motions: [MotionLine.firstNonBlank()]}),
            ActionMode.toInsert,
        ] },
        { keys: 'a', actions: [
            () => ActionMoveCursor.byMotions({motions: [MotionCharacter.right()]}),
            ActionMode.toInsert,
        ] },
        { keys: 'A', actions: [
            () => ActionMoveCursor.byMotions({motions: [MotionLine.end()]}),
            ActionMode.toInsert,
        ] },

        { keys: 'o', actions: [
            ActionInsert.newLineAfter,
            ActionMode.toInsert,
        ] },
        { keys: 'O', actions: [
            ActionInsert.newLineBefore,
            ActionMode.toInsert,
        ] },

        { keys: 's', actions: [
            () => ActionDelete.selectionsOrRight({shouldYank: true}),
            ActionMode.toInsert,
        ] },

        { keys: 'X', actions: [() => ActionDelete.selectionsOrLeft({shouldYank: true})] },
        { keys: 'x', actions: [() => ActionDelete.selectionsOrRight({shouldYank: true})] },
        { keys: 'delete', actions: [() => ActionDelete.selectionsOrRight({shouldYank: true})] },
        { keys: 'd d', actions: [() => ActionDelete.line({shouldYank: true})] },
        { keys: 'D', actions: [() => ActionDelete.byMotions({motions: [MotionLine.end()], shouldYank: true})] },
        { keys: 'd {motion}', actions: [ActionDelete.byMotions], args: {shouldYank: true} },
        { keys: 'C', actions: [
            () => ActionDelete.byMotions({motions: [MotionLine.end()], shouldYank: true}),
            ActionMode.toInsert,
        ] },
        { keys: 'c c', actions: [
            () => ActionMoveCursor.byMotions({motions: [MotionLine.firstNonBlank()]}),
            () => ActionDelete.byMotions({motions: [MotionLine.end()], shouldYank: true}),
            ActionMode.toInsert,
        ] },
        { keys: 'S', actions: [
            () => ActionMoveCursor.byMotions({motions: [MotionLine.firstNonBlank()]}),
            () => ActionDelete.byMotions({motions: [MotionLine.end()], shouldYank: true}),
            ActionMode.toInsert,
        ] },
        { keys: 'c {motion}', actions: [
            (args: {motions: Motion[]}) => ActionDelete.byMotions({
                motions: args.motions,
                shouldYank: true,
                cwNeedsFixup: true,
            }),
            ActionMode.toInsert,
        ] },
        { keys: 'J', actions: [ActionJoinLines.onSelections] },

        { keys: 'r {char}', actions: [ActionReplace.characters] },

        { keys: 'y y', actions: [ActionRegister.yankLines] },
        { keys: 'Y', actions: [ActionRegister.yankLines] },
        { keys: 'y {motion}', actions: [ActionRegister.yankByMotions] },
        { keys: 'p', actions: [ActionRegister.putAfter] },
        { keys: 'P', actions: [ActionRegister.putBefore] },

        { keys: 'n', actions: [ActionFind.next] },
        { keys: 'N', actions: [ActionFind.prev] },
        { keys: '*', actions: [
            ActionFind.byIndicator,
            ActionFind.next,
        ] },
        { keys: '#', actions: [
            ActionFind.byIndicator,
            ActionFind.prev,
        ] },

        { keys: 'u', actions: [ActionHistory.undo] },
        { keys: 'ctrl+r', actions: [ActionHistory.redo] },

        { keys: '< <', actions: [ActionIndent.decrease] },
        { keys: '> >', actions: [ActionIndent.increase] },

        { keys: '/', actions: [ActionFind.focusFindWidget] },

        { keys: 'v', actions: [ActionMode.toVisual] },
        { keys: 'V', actions: [ActionMode.toVisualLine] },

        { keys: 'z .', actions: [ActionReveal.primaryCursor], args: {revealType: TextEditorRevealType.InCenter} },
        { keys: 'z z', actions: [ActionReveal.primaryCursor], args: {revealType: TextEditorRevealType.InCenter} },

        { keys: 'ctrl+c', actions: [
            ActionSuggestion.hide,
            ActionSelection.shrinkToPrimaryActive,
        ] },
        { keys: 'escape', actions: [
            ActionSuggestion.hide,
            ActionSelection.shrinkToPrimaryActive,
        ] },
    ];

    constructor() {
        super();

        this.maps.forEach(map => {
            this.mapper.map(map.keys, map.actions, map.args);
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
