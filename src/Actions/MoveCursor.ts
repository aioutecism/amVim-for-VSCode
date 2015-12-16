import {window, Position, Range, Selection} from 'vscode';
import {ActionReveal} from './Reveal';
import {Motion} from '../Motions/Motion';
import {MotionCharacter} from '../Motions/Character';
import {MotionWord} from '../Motions/Word';
import {MotionLine} from '../Motions/Line';
import {MotionDocument} from '../Motions/Document';

export class ActionMoveCursor {

    private static move(motion: Motion): Thenable<boolean> {
        const activeTextEditor = window.activeTextEditor;

        if (! activeTextEditor) {
            return Promise.resolve(false);
        }

        // TODO: Preserve character position

        activeTextEditor.selections = activeTextEditor.selections.map(selection => {
            return motion.apply(selection);
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
