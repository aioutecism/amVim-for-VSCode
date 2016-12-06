import {StaticReflect} from '../LanguageExtensions/StaticReflect';
import {SymbolMetadata} from '../Symbols/Metadata';
import {Mode, ModeID} from './Mode';
import {CommandMap} from '../Mappers/Command';
import {ActionMoveCursor} from '../Actions/MoveCursor';
import {ActionPage, PageMoveType} from '../Actions/Page';
import {ActionSelection} from '../Actions/Selection';
import {ActionRegister} from '../Actions/Register';
import {ActionDelete} from '../Actions/Delete';
import {ActionInsert} from '../Actions/Insert';
import {ActionCase} from '../Actions/Case';
import {ActionReplace} from '../Actions/Replace';
import {ActionIndent} from '../Actions/Indent';
import {ActionJoinLines} from '../Actions/JoinLines';
import {ActionFilter} from '../Actions/Filter';
import {ActionFind} from '../Actions/Find';
import {ActionNativeEscape} from '../Actions/NativeEscape';
import {ActionMode} from '../Actions/Mode';
import {ActionFold} from '../Actions/Fold';
import {MotionLine} from '../Motions/Line';

export class ModeVisual extends Mode {

    id = ModeID.VISUAL;
    name = 'VISUAL';

    private maps: CommandMap[] = [
        { keys: '{motion}', actions: [ActionMoveCursor.byMotions], args: {isVisualMode: true} },
        { keys: '{textObject}', actions: [ActionSelection.expandByTextObject]},

        { keys: 'ctrl+b', actions: [ActionPage.up], args: {moveType: PageMoveType.Select} },
        { keys: 'ctrl+f', actions: [ActionPage.down], args: {moveType: PageMoveType.Select} },

        { keys: 'I', actions: [
            ActionSelection.shrinkToStarts,
            ActionMode.toInsert,
        ] },
        { keys: 'A', actions: [
            ActionSelection.shrinkToEnds,
            ActionMode.toInsert,
        ] },

        { keys: 'backspace', actions: [ActionDelete.selectionsOrRight], args: {shouldYank: true} },
        { keys: 'delete', actions: [ActionDelete.selectionsOrRight], args: {shouldYank: true} },
        { keys: 'x', actions: [ActionDelete.selectionsOrRight], args: {shouldYank: true} },
        { keys: 'X', actions: [ActionDelete.byLines], args: {shouldYank: true} },
        { keys: 'd', actions: [ActionDelete.selectionsOrRight], args: {shouldYank: true} },
        { keys: 'D', actions: [ActionDelete.byLines], args: {shouldYank: true} },
        { keys: 'c', actions: [
            ActionDelete.selectionsOrRight,
            ActionMode.toInsert,
        ], args: {shouldYank: true} },
        { keys: 'C', actions: [
            ActionDelete.byLines,
            ActionInsert.newLineBefore,
            ActionMode.toInsert,
        ], args: {shouldYank: true} },
        { keys: 's', actions: [
            ActionDelete.selectionsOrRight,
            ActionMode.toInsert,
        ], args: {shouldYank: true} },
        { keys: 'S', actions: [
            ActionDelete.byLines,
            ActionInsert.newLineBefore,
            ActionMode.toInsert,
        ], args: {shouldYank: true} },
        { keys: 'y', actions: [
            ActionRegister.yankSelections,
            ActionSelection.shrinkToStarts,
        ] },
        { keys: 'J', actions: [
            ActionJoinLines.onSelections,
            ActionSelection.shrinkToActives,
        ] },

        { keys: 'p', actions: [ActionReplace.selectionsWithRegister], args: {shouldYank: true} },
        { keys: 'P', actions: [ActionReplace.selectionsWithRegister], args: {shouldYank: true} },

        { keys: 'r {char}', actions: [
            ActionReplace.selectionsWithCharacter,
            ActionSelection.shrinkToStarts,
        ] },
        { keys: '~', actions: [ActionCase.switchSelections] },

        { keys: '=', actions: [ActionFilter.Format.bySelections] },

        { keys: '<', actions: [
            ActionIndent.decrease,
            () => ActionMoveCursor.byMotions({ motions: [MotionLine.firstNonBlank()] }),
        ] },
        { keys: '>', actions: [
            ActionIndent.increase,
            () => ActionMoveCursor.byMotions({ motions: [MotionLine.firstNonBlank()] }),
        ] },

        { keys: '/', actions: [ActionFind.focusFindWidget] },

        { keys: 'V', actions: [ActionMode.toVisualLine] },
        { keys: 'v', actions: [ActionSelection.shrinkToActives] },

        { keys: 'z c', actions: [ActionFold.fold]},
        { keys: 'z o', actions: [ActionFold.unfold]},
        { keys: 'z M', actions: [ActionFold.foldAll]},
        { keys: 'z R', actions: [ActionFold.unfoldAll]},

        { keys: 'ctrl+c', actions: [
            ActionNativeEscape.press,
            ActionSelection.shrinkToActives,
        ] },
        { keys: 'ctrl+[', actions: [
            ActionNativeEscape.press,
            ActionSelection.shrinkToActives,
        ] },
        { keys: 'escape', actions: [
            ActionNativeEscape.press,
            ActionSelection.shrinkToActives,
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

        ActionSelection.expandToOne();
    }

    private _recordedCommandMaps: CommandMap[];
    get recordedCommandMaps() { return this._recordedCommandMaps; }

    protected onWillCommandMapMakesChanges(map: CommandMap): void {
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
    }

}
