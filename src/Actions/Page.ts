import {commands} from 'vscode';
import {ActionSelection} from './Selection';

export enum PageMoveType {Normal, Select, SelectLine};

export class ActionPage {

    static up(args: {moveType?: PageMoveType} = {}): Thenable<boolean> {
        args.moveType = args.moveType === undefined ? PageMoveType.Normal : args.moveType;

        if (args.moveType === PageMoveType.Normal) {
            return commands.executeCommand('cursorPageUp');
        }
        else {
            const thenable = commands.executeCommand('cursorPageUpSelect');

            if (args.moveType === PageMoveType.SelectLine) {
                thenable.then(() => ActionSelection.expandToLine());
            }

            return thenable;
        }
    }

    static down(args: {moveType?: PageMoveType} = {}): Thenable<boolean> {
        args.moveType = args.moveType === undefined ? PageMoveType.Normal : args.moveType;

        if (args.moveType === PageMoveType.Normal) {
            return commands.executeCommand('cursorPageDown');
        }
        else {
            const thenable = commands.executeCommand('cursorPageDownSelect');

            if (args.moveType === PageMoveType.SelectLine) {
                thenable.then(() => ActionSelection.expandToLine());
            }

            return thenable;
        }
    }

};
