import {window, Position, Range} from 'vscode';
import {Mode, ModeID} from './Mode';
import {MatchResultKind} from '../Mappers/Generic';
import {CommandMap} from '../Mappers/Command';
import {ActionInsert} from '../Actions/Insert';
import {ActionDelete} from '../Actions/Delete';
import {ActionSelection} from '../Actions/Selection';
import {ActionMoveCursor} from '../Actions/MoveCursor';
import {ActionNativeEscape} from '../Actions/NativeEscape';
import {ActionMode} from '../Actions/Mode';
import {MotionCharacter} from '../Motions/Character';
import {MotionWord} from '../Motions/Word';
import {MotionLine} from '../Motions/Line';

export class ModeInsert extends Mode {

    id = ModeID.INSERT;
    name = 'INSERT';

    private maps: CommandMap[] = [
        { keys: 'ctrl+w', actions: [() => ActionDelete.byMotions({motions: [MotionWord.prevStart()]})] },
        { keys: 'ctrl+u', actions: [() => ActionDelete.byMotions({motions: [MotionLine.firstNonBlank()]})] },

        { keys: 'ctrl+c', actions: [
            ActionNativeEscape.press,
            () => ActionSelection.shrinkToActives()
                .then(isShrinked => isShrinked ? Promise.resolve(true) : ActionMode.toNormal()),
        ] },
        { keys: 'ctrl+[', actions: [
            ActionNativeEscape.press,
            () => ActionSelection.shrinkToActives()
                .then(isShrinked => isShrinked ? Promise.resolve(true) : ActionMode.toNormal()),
        ] },
        { keys: 'escape', actions: [
            ActionNativeEscape.press,
            () => ActionSelection.shrinkToActives()
                .then(isShrinked => isShrinked ? Promise.resolve(true) : ActionMode.toNormal()),
        ] },
    ];

    constructor() {
        super();

        this.maps.forEach(map => {
            this.mapper.map(map.keys, map.actions, map.args);
        });
    }

    exit(): void {
        super.exit();

        this.endRecord();

        ActionMoveCursor.byMotions({ motions: [ MotionCharacter.left() ] });
    }

    input(key: string, args: {replaceCharCnt?: number} = {}): MatchResultKind {
        const matchResultKind = super.input(key);

        // Pass key to built-in command if match failed.
        if (matchResultKind !== MatchResultKind.FAILED) {
            return matchResultKind;
        }

        this.startRecord();

        this.pushCommandMap({
            keys: key,
            actions: [ ActionInsert.textAtSelections ],
            args: {
                text: key,
                replaceCharCnt: args.replaceCharCnt,
            }
        });
        this.execute();

        return MatchResultKind.FOUND;
    }

    private isRecording: boolean = false;
    private recordStartPosition: Position;
    private recordedText: string;

    private _recordedCommandMaps: CommandMap[];
    get recordedCommandMaps() { return this._recordedCommandMaps; }

    private startRecord(): void {
        if (this.isRecording) {
            return;
        }

        const activeTextEditor = window.activeTextEditor;
        if (! activeTextEditor) {
            return;
        }

        this.isRecording = true;
        this.recordStartPosition = activeTextEditor.selection.active;
        this.recordedText = '';
    }

    private processRecord(): void {
        const activeTextEditor = window.activeTextEditor;
        if (! activeTextEditor) {
            return;
        }

        // TODO: check if end position is before start position.

        this.recordedText += activeTextEditor.document.getText(new Range(
            this.recordStartPosition, activeTextEditor.selection.active
        ));
    }

    private endRecord(): void {
        this.isRecording = false;

        this.processRecord();

        this._recordedCommandMaps = [{
            keys: '',
            actions: [ ActionInsert.textAtSelections ],
            args: {
                text: this.recordedText,
            },
            isRepeating: true,
        }];

        // TODO: Move cursor.
    }

    protected onWillCommandMapMakesChanges(map: CommandMap): void {
        if (! this.isRecording) {
            return;
        }

        if (map.keys === '\n') {
            this.processRecord();
            this.recordedText += '\n';
        }
    }

    protected onDidCommandMapMakesChanges(map: CommandMap): void {
        if (! this.isRecording) {
            return;
        }

        if (map.keys === '\n') {
            const activeTextEditor = window.activeTextEditor;
            if (! activeTextEditor) {
                return;
            }

            this.recordStartPosition = window.activeTextEditor.selection.active;
        }
    }

}
