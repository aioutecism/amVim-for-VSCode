import {TextEditorRevealType} from 'vscode';
import {StaticReflect} from '../LanguageExtensions/StaticReflect';
import {SymbolMetadata} from '../Symbols/Metadata';
import {Mode, ModeID} from './Mode';
import {CommandMap} from '../Mappers/Command';
import {ActionBlockCursor} from '../Actions/BlockCursor';
import {ActionMoveCursor} from '../Actions/MoveCursor';
import {ActionPage} from '../Actions/Page';
import {ActionInsert} from '../Actions/Insert';
import {ActionDelete} from '../Actions/Delete';
import {ActionReplace} from '../Actions/Replace';
import {ActionCase} from '../Actions/Case';
import {ActionRegister} from '../Actions/Register';
import {ActionReveal} from '../Actions/Reveal';
import {ActionNativeEscape} from '../Actions/NativeEscape';
import {ActionJoinLines} from '../Actions/JoinLines';
import {ActionFind} from '../Actions/Find';
import {ActionSelection} from '../Actions/Selection';
import {ActionHistory} from '../Actions/History';
import {ActionIndent} from '../Actions/Indent';
import {ActionFilter} from '../Actions/Filter';
import {ActionMode} from '../Actions/Mode';
import {ActionFold} from '../Actions/Fold';
import {MotionCharacter} from '../Motions/Character';
import {MotionLine} from '../Motions/Line';
import { ActionCommand } from '../Actions/Command';

export class ModeNormal extends Mode {

    id = ModeID.NORMAL;
    name = 'NORMAL';

    private maps: CommandMap[] = [
        { keys: '{motion}', actions: [ActionMoveCursor.byMotions], args: {noEmptyAtLineEnd: true} },
        { keys: '{N} {motion}', actions: [ActionMoveCursor.byMotions], args: {noEmptyAtLineEnd: true} },

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
            ActionDelete.selectionsOrRight,
            ActionMode.toInsert,
        ], args: {
            shouldYank: true
        } },

        { keys: 'X', actions: [ActionDelete.selectionsOrLeft], args: {shouldYank: true} },
        { keys: 'x', actions: [
            ActionDelete.selectionsOrRight,
            ActionSelection.validateSelections,
        ], args: {
            shouldYank: true
        } },
        { keys: 'delete', actions: [
            ActionDelete.selectionsOrRight,
            ActionSelection.validateSelections,
        ], args: {
            shouldYank: true
        } },
        { keys: 'd d', actions: [ActionDelete.byLines], args: {shouldYank: true} },
        { keys: '{N} d d', actions: [ActionDelete.byLines], args: {shouldYank: true} },
        { keys: 'd {N} d', actions: [ActionDelete.byLines], args: {shouldYank: true} },
        { keys: 'D', actions: [
            ActionDelete.byMotions,
            ActionSelection.validateSelections,
        ], args: {
            motions: [MotionLine.end()],
            shouldYank: true
        } },
        { keys: 'd {motion}', actions: [
            ActionDelete.byMotions,
            ActionSelection.validateSelections,
        ], args: {
            shouldYank: true
        } },
        { keys: 'd {N} {motion}', actions: [
            ActionDelete.byMotions,
            ActionSelection.validateSelections,
        ], args: {
            shouldYank: true
        } },
        { keys: 'd {textObject}', actions: [
            ActionDelete.byTextObject,
            ActionSelection.validateSelections,
        ], args: {
            shouldYank: true
        } },
        { keys: 'C', actions: [
            ActionDelete.byMotions,
            ActionMode.toInsert,
        ], args: {
            motions: [MotionLine.end()],
            shouldYank: true
        } },
        { keys: 'c c', actions: [
            () => ActionMoveCursor.byMotions({motions: [MotionLine.firstNonBlank()]}),
            ActionDelete.byMotions,
            ActionMode.toInsert,
        ], args: {
            motions: [MotionLine.end()],
            shouldYank: true
        } },
        { keys: 'S', actions: [
            () => ActionMoveCursor.byMotions({motions: [MotionLine.firstNonBlank()]}),
            ActionDelete.byMotions,
            ActionMode.toInsert,
        ], args: {
            motions: [MotionLine.end()],
            shouldYank: true
        } },
        { keys: 'c {motion}', actions: [
            ActionDelete.byMotions,
            ActionMode.toInsert,
        ], args: {
            shouldYank: true,
            isChangeAction: true,
        } },
        { keys: 'c {N} {motion}', actions: [
            ActionDelete.byMotions,
            ActionMode.toInsert,
        ], args: {
            shouldYank: true,
            isChangeAction: true,
        } },
        { keys: 'c {textObject}', actions: [
            ActionDelete.byTextObject,
            ActionMode.toInsert,
        ], args: {
            shouldYank: true,
        } },
        { keys: 'J', actions: [ActionJoinLines.onSelections] },

        { keys: 'r {char}', actions: [ActionReplace.charactersWithCharacter] },
        { keys: '~', actions: [
            ActionCase.switchActives,
            () => ActionMoveCursor.byMotions({motions: [MotionCharacter.right()]}),
        ] },

        { keys: 'y y', actions: [ActionRegister.yankLines] },
        { keys: '{N} y y', actions: [ActionRegister.yankLines] },
        { keys: 'y {N} y', actions: [ActionRegister.yankLines] },
        { keys: 'Y', actions: [ActionRegister.yankLines] },
        { keys: 'y {motion}', actions: [ActionRegister.yankByMotions] },
        { keys: 'y {N} {motion}', actions: [ActionRegister.yankByMotions] },
        { keys: 'y {textObject}', actions: [ActionRegister.yankByTextObject] },
        { keys: 'p', actions: [ActionRegister.putAfter] },
        { keys: '{N} p', actions: [ActionRegister.putAfter] },
        { keys: 'P', actions: [ActionRegister.putBefore] },
        { keys: '{N} P', actions: [ActionRegister.putBefore] },

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

        { keys: '= {motion}', actions: [ActionFilter.Format.byMotions] },
        { keys: '= {N} {motion}', actions: [ActionFilter.Format.byMotions] },
        { keys: '= =', actions: [ActionFilter.Format.byCursors] },

        { keys: 'u', actions: [
            ActionHistory.undo,
            ActionSelection.validateSelections,
        ] },
        { keys: 'ctrl+r', actions: [
            ActionHistory.redo,
            ActionSelection.validateSelections,
        ] },

        { keys: '< <', actions: [ActionIndent.decrease] },
        { keys: '> >', actions: [ActionIndent.increase] },

        { keys: '/', actions: [ActionFind.focusFindWidget] },

        { keys: 'v', actions: [ActionMode.toVisual] },
        { keys: 'V', actions: [ActionMode.toVisualLine] },

        { keys: 'z .', actions: [ActionReveal.primaryCursor], args: {revealType: TextEditorRevealType.InCenter} },
        { keys: 'z z', actions: [ActionReveal.primaryCursor], args: {revealType: TextEditorRevealType.InCenter} },
        { keys: 'z c', actions: [ActionFold.fold] },
        { keys: 'z o', actions: [ActionFold.unfold] },
        { keys: 'z M', actions: [ActionFold.foldAll] },
        { keys: 'z R', actions: [ActionFold.unfoldAll] },

        { keys: ':', actions: [ActionCommand.goToLine] },

        { keys: '.', actions: [this.repeatRecordedCommandMaps.bind(this)] },

        { keys: 'ctrl+c', actions: [
            ActionNativeEscape.press,
            ActionSelection.shrinkToPrimaryActive,
        ] },
        { keys: 'ctrl+[', actions: [
            ActionNativeEscape.press,
            ActionSelection.shrinkToPrimaryActive,
        ] },
        { keys: 'escape', actions: [
            ActionNativeEscape.press,
            ActionSelection.shrinkToPrimaryActive,
        ] },
    ];

    constructor() {
        super();

        this.maps.forEach(map => {
            this.mapper.map(map.keys, map.actions, map.args);
        });
    }

    enter(): void {
        super.enter();

        ActionBlockCursor.on();
    }

    exit(): void {
        super.exit();

        ActionBlockCursor.off();
    }

    private _recordedCommandMaps: CommandMap[];
    get recordedCommandMaps() { return this._recordedCommandMaps; }

    protected onWillCommandMapMakesChanges(map: CommandMap): Promise<boolean> {
        if (map.isRepeating) {
            return Promise.resolve(false);
        }

        const actions = map.actions.filter(action => {
            return StaticReflect.getMetadata(SymbolMetadata.Action.shouldSkipOnRepeat, action) !== true;
        });

        this._recordedCommandMaps = [
            {
                keys: map.keys,
                actions: actions,
                args: map.args,
                isRepeating: true,
            }
        ];

        return Promise.resolve(true);
    }

    onDidRecordFinish(recordedCommandMaps: CommandMap[], lastModeID: ModeID): void {
        if (! recordedCommandMaps || recordedCommandMaps.length === 0) {
            return;
        }

        if (lastModeID === ModeID.INSERT) {
            recordedCommandMaps.forEach(map => map.isRepeating = true);

            if (this._recordedCommandMaps === undefined) {
                this._recordedCommandMaps = recordedCommandMaps;
            }
            else {
                this._recordedCommandMaps = this._recordedCommandMaps.concat(recordedCommandMaps);
            }
        }
        else {
            this._recordedCommandMaps = recordedCommandMaps;
        }
    }

    private repeatRecordedCommandMaps(): Thenable<boolean> {
        if (this._recordedCommandMaps === undefined) {
            return Promise.resolve(false);
        }

        // TODO: Replace `args.n` if provided

        this._recordedCommandMaps.forEach(map => this.pushCommandMap(map));
        this.pushCommandMap({
            keys: 'escape',
            actions: [ActionNativeEscape.press],
        });
        this.execute();

        return Promise.resolve(true);
    }

}
