import {window, Position, Range, Selection} from 'vscode';
import {ActionReveal} from './Reveal';
import {Motion} from '../Motions/Motion';
import {MotionCharacter} from '../Motions/Character';
import {MotionWord} from '../Motions/Word';
import {MotionLine} from '../Motions/Line';
import {MotionDocument} from '../Motions/Document';

export class ActionMoveCursor {

    private static move(_motions: Motion | Motion[]): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        // TODO: Preserve character position

        const motions = Array.isArray(_motions)
            ? _motions as Motion[]
            : [_motions as Motion];

        activeTextEditor.selections = activeTextEditor.selections.map(selection => {
            motions.forEach((motion) => {
                selection = motion.apply(selection);
            });
            return selection;
        });

        return ActionReveal.primaryCursor();
    }

    static characterLeft(): Thenable<boolean> {
        const motion = new MotionCharacter();
        motion.left();
        return ActionMoveCursor.move(motion);
    }

    static characterRight(): Thenable<boolean> {
        const motion = new MotionCharacter();
        motion.right();
        return ActionMoveCursor.move(motion);
    }

    static characterUp(): Thenable<boolean> {
        const motion = new MotionCharacter();
        motion.up();
        return ActionMoveCursor.move(motion);
    }

    static characterDown(): Thenable<boolean> {
        const motion = new MotionCharacter();
        motion.down();
        return ActionMoveCursor.move(motion);
    }

    static wordNextStart(): Thenable<boolean> {
        const motion = new MotionWord();
        motion.nextStart();
        return ActionMoveCursor.move(motion);
    }

    static wordNextEnd(): Thenable<boolean> {
        const motion = new MotionWord();
        motion.nextEnd();
        return ActionMoveCursor.move(motion);
    }

    static wordPrevStart(): Thenable<boolean> {
        const motion = new MotionWord();
        motion.prevStart();
        return ActionMoveCursor.move(motion);
    }

    static firstNonBlankInLine(): Thenable<boolean> {
        const motion = new MotionLine();
        motion.firstNonBlank();
        return ActionMoveCursor.move(motion);
    }

    static firstNonBlankInLineUp(): Thenable<boolean> {
        const motion1 = new MotionCharacter();
        motion1.up();

        const motion2 = new MotionLine();
        motion2.firstNonBlank();

        return ActionMoveCursor.move([motion1, motion2]);
    }

    static firstNonBlankInLineDown(): Thenable<boolean> {
        const motion1 = new MotionCharacter();
        motion1.down();

        const motion2 = new MotionLine();
        motion2.firstNonBlank();

        return ActionMoveCursor.move([motion1, motion2]);
    }

    static lineStart(): Thenable<boolean> {
        const motion = new MotionLine();
        motion.start();
        return ActionMoveCursor.move(motion);
    }

    static lineEnd(): Thenable<boolean> {
        const motion = new MotionLine();
        motion.end();
        return ActionMoveCursor.move(motion);
    }

    static documentStart(): Thenable<boolean> {
        const motion = new MotionDocument();
        motion.start();
        return ActionMoveCursor.move(motion);
    }

    static documentEnd(): Thenable<boolean> {
        const motion = new MotionDocument();
        motion.end();
        return ActionMoveCursor.move(motion);
    }

}
