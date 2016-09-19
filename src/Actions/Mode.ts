import {window, commands} from 'vscode';
import {PrototypeReflect} from '../LanguageExtensions/PrototypeReflect';
import {SymbolMetadata} from '../Symbols/Metadata';
import {ModeID} from '../Modes/Mode';
import {ActionSelection} from '../Actions/Selection';

export class ActionMode {

    @PrototypeReflect.metadata(SymbolMetadata.Action.shouldSkipOnRepeat, true)
    static toNormal(): Thenable<boolean> {
        return commands.executeCommand(`amVim.mode.${ModeID.NORMAL}`)
            .then(() => ActionSelection.validateSelections());
    }

    @PrototypeReflect.metadata(SymbolMetadata.Action.shouldSkipOnRepeat, true)
    static toVisual(): Thenable<boolean> {
        return commands.executeCommand(`amVim.mode.${ModeID.VISUAL}`);
    }

    @PrototypeReflect.metadata(SymbolMetadata.Action.shouldSkipOnRepeat, true)
    static toVisualLine(): Thenable<boolean> {
        return commands.executeCommand(`amVim.mode.${ModeID.VISUAL_LINE}`);
    }

    @PrototypeReflect.metadata(SymbolMetadata.Action.isChange, true)
    @PrototypeReflect.metadata(SymbolMetadata.Action.shouldSkipOnRepeat, true)
    static toInsert(): Thenable<boolean> {
        return commands.executeCommand(`amVim.mode.${ModeID.INSERT}`);
    }

    static switchByActiveSelections(currentMode: ModeID): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        const selections = activeTextEditor.selections;

        let mode: ModeID;

        if (currentMode === ModeID.INSERT) {
            return Promise.resolve(true);
        }

        if (selections.every(selection => selection.isEmpty)) {
            mode = ModeID.NORMAL;
        }
        else {
            mode = ModeID.VISUAL;
        }

        if (mode === currentMode) {
            if (mode === ModeID.NORMAL) {
                return ActionSelection.validateSelections();
            }
            else {
                return Promise.resolve(true);
            }
        }
        else if (mode === ModeID.VISUAL && currentMode === ModeID.VISUAL_LINE) {
            return Promise.resolve(true);
        }
        else {
            return commands.executeCommand(`amVim.mode.${mode}`)
                .then(() => ActionSelection.validateSelections());
        }
    }

};
