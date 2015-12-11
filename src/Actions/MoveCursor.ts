import {window, Position, Selection} from 'vscode';
import {MotionCharacter} from '../Motions/Character';
import {MotionLine} from '../Motions/Line';
import {MotionDocument} from '../Motions/Document';

export class ActionMoveCursor {
	private static moveTo(position: Position): Thenable<boolean> {
		const activeTextEditor = window.activeTextEditor;

		if (! activeTextEditor) {
			return Promise.resolve(false);
		}

		// TODO: Support multi selections

		activeTextEditor.selection = new Selection(position, position);

		// TODO: Scroll View

		return Promise.resolve(true);
	}

	static characterLeft(): Thenable<boolean> {
		const motion = new MotionCharacter();
		motion.left();
		return ActionMoveCursor.moveTo(motion.targetPosition);
	}

	static characterRight(): Thenable<boolean> {
		const motion = new MotionCharacter();
		motion.right();
		return ActionMoveCursor.moveTo(motion.targetPosition);
	}

	static characterUp(): Thenable<boolean> {
		const motion = new MotionCharacter();
		motion.up();
		return ActionMoveCursor.moveTo(motion.targetPosition);
	}

	static characterDown(): Thenable<boolean> {
		const motion = new MotionCharacter();
		motion.down();
		return ActionMoveCursor.moveTo(motion.targetPosition);
	}

	static lineStart(): Thenable<boolean> {
		const motion = new MotionLine();
		motion.start();
		return ActionMoveCursor.moveTo(motion.targetPosition);
	}

	static lineEnd(): Thenable<boolean> {
		const motion = new MotionLine();
		motion.end();
		return ActionMoveCursor.moveTo(motion.targetPosition);
	}

	static documentStart(): Thenable<boolean> {
		const motion = new MotionDocument();
		motion.start();
		return ActionMoveCursor.moveTo(motion.targetPosition);
	}

	static documentEnd(): Thenable<boolean> {
		const motion = new MotionDocument();
		motion.end();
		return ActionMoveCursor.moveTo(motion.targetPosition);
	}
}