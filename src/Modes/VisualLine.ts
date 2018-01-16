import {window} from 'vscode';
import {StaticReflect} from '../LanguageExtensions/StaticReflect';
import {SymbolMetadata} from '../Symbols/Metadata';
import {RangeOffset} from '../Types/RangeOffset';
import {Mode, ModeID} from './Mode';
import {CommandMap} from '../Mappers/Command';
import {ActionMoveCursor} from '../Actions/MoveCursor';
import {ActionPage, PageMoveType} from '../Actions/Page';
import {ActionSelection} from '../Actions/Selection';
import {ActionRegister} from '../Actions/Register';
import {ActionDelete} from '../Actions/Delete';
import {ActionInsert} from '../Actions/Insert';
import {ActionReplace} from '../Actions/Replace';
import {ActionCase} from '../Actions/Case';
import {ActionJoinLines} from '../Actions/JoinLines';
import {ActionFilter} from '../Actions/Filter';
import {ActionFind} from '../Actions/Find';
import {ActionNativeEscape} from '../Actions/NativeEscape';
import {ActionMode} from '../Actions/Mode';
import {ActionIndent} from '../Actions/Indent';
import {ActionFold} from '../Actions/Fold';

export class ModeVisualLine extends Mode {

    id = ModeID.VISUAL_LINE;
    name = 'VISUAL LINE';

    private maps: CommandMap[] = [
        { keys: '{motion}', actions: [ActionMoveCursor.byMotions], args: {isVisualLineMode: true} },
        { keys: '{N} {motion}', actions: [ActionMoveCursor.byMotions], args: {isVisualLineMode: true} },

        { keys: 'ctrl+b', actions: [ActionPage.up], args: {moveType: PageMoveType.SelectLine} },
        { keys: 'ctrl+f', actions: [ActionPage.down], args: {moveType: PageMoveType.SelectLine} },

        { keys: 'I', actions: [
            ActionSelection.shrinkToStarts,
            ActionMode.toInsert
        ] },
        { keys: 'A', actions: [
            ActionSelection.shrinkToEnds,
            ActionMode.toInsert
        ] },

        { keys: 'backspace', actions: [ActionDelete.byLines], args: {shouldYank: true} },
        { keys: 'delete', actions: [ActionDelete.byLines], args: {shouldYank: true} },
        { keys: 'x', actions: [ActionDelete.byLines], args: {shouldYank: true} },
        { keys: 'X', actions: [ActionDelete.byLines], args: {shouldYank: true} },
        { keys: 'd', actions: [ActionDelete.byLines], args: {shouldYank: true} },
        { keys: 'D', actions: [ActionDelete.byLines], args: {shouldYank: true} },
        { keys: 'c', actions: [
            ActionDelete.byLines,
            ActionInsert.newLineBefore,
            ActionMode.toInsert,
        ], args: {shouldYank: true} },
        { keys: 'C', actions: [
            ActionDelete.byLines,
            ActionInsert.newLineBefore,
            ActionMode.toInsert,
        ], args: {shouldYank: true} },
        { keys: 's', actions: [
            ActionDelete.byLines,
            ActionInsert.newLineBefore,
            ActionMode.toInsert,
        ], args: {shouldYank: true} },
        { keys: 'S', actions: [
            ActionDelete.byLines,
            ActionInsert.newLineBefore,
            ActionMode.toInsert,
        ], args: {shouldYank: true} },
        { keys: 'y', actions: [
            ActionRegister.yankLines,
            ActionSelection.shrinkToStarts,
        ] },
        { keys: 'J', actions: [
            ActionJoinLines.onSelections,
            ActionSelection.shrinkToActives,
        ] },

        { keys: 'p', actions: [ActionReplace.selectionsWithRegister], args: {
            shouldYank: true,
            isLinewise: true,
        } },
        { keys: 'P', actions: [ActionReplace.selectionsWithRegister], args: {
            shouldYank: true,
            isLinewise: true,
        } },

        { keys: 'r {char}', actions: [
            ActionReplace.selectionsWithCharacter,
            ActionSelection.shrinkToStarts,
        ] },

        { keys: '~', actions: [
            ActionCase.switchSelections,
            ActionSelection.shrinkToStarts,
        ] },
        { keys: 'u', actions: [
            ActionCase.lowercaseSelections,
            ActionSelection.shrinkToStarts,
        ] },
        { keys: 'U', actions: [
            ActionCase.uppercaseSelections,
            ActionSelection.shrinkToStarts,
        ] },

        { keys: '=', actions: [ActionFilter.Format.bySelections] },

        { keys: '<', actions: [ActionIndent.decrease], args: { isVisualLineMode: true } },
        { keys: '>', actions: [ActionIndent.increase], args: { isVisualLineMode: true } },

        { keys: '/', actions: [ActionFind.focusFindWidget] },

        { keys: 'v', actions: [ActionMode.toVisual] },
        { keys: 'V', actions: [ActionSelection.shrinkToActives] },

        { keys: 'z c', actions: [ActionFold.fold] },
        { keys: 'z o', actions: [ActionFold.unfold] },
        { keys: 'z M', actions: [ActionFold.foldAll] },
        { keys: 'z R', actions: [ActionFold.unfoldAll] },

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

        ActionSelection.expandToLine();
    }

    private _recordedCommandMaps: CommandMap[];
    get recordedCommandMaps() { return this._recordedCommandMaps; }

    protected onWillCommandMapMakesChanges(map: CommandMap): Promise<boolean> {
        const actions = map.actions.filter(action => {
            return StaticReflect.getMetadata(SymbolMetadata.Action.shouldSkipOnRepeat, action) !== true;
        });

        const args = Object.assign({
            preferedRelativeRange: window.activeTextEditor
                ? new RangeOffset(window.activeTextEditor.selection)
                : undefined,
        }, map.args);

        this._recordedCommandMaps = [
            {
                keys: map.keys,
                actions: actions,
                args: args,
                isRepeating: true,
            }
        ];

        return Promise.resolve(true);
    }

}
