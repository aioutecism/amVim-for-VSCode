import {window, Position, Selection} from 'vscode';
import {MotionCharacter} from '../Motions/Character';
import {MotionLine} from '../Motions/Line';
import {MotionDocument} from '../Motions/Document';

export class ActionMoveCursor {
	private static moveTo(position: Position): void {
		const activeTextEditor = window.activeTextEditor;

		if (! activeTextEditor) {
			return;
		}

		activeTextEditor.selection = new Selection(position, position);

		// TODO: Scroll View
	}

	static characterLeft(): void {
		const motion = new MotionCharacter();
		motion.left();
		ActionMoveCursor.moveTo(motion.targetPosition);
	}

	static characterRight(): void {
		const motion = new MotionCharacter();
		motion.right();
		ActionMoveCursor.moveTo(motion.targetPosition);
	}

	static characterUp(): void {
		const motion = new MotionCharacter();
		motion.up();
		ActionMoveCursor.moveTo(motion.targetPosition);
	}

	static characterDown(): void {
		const motion = new MotionCharacter();
		motion.down();
		ActionMoveCursor.moveTo(motion.targetPosition);
	}

	static lineStart(): void {
		const motion = new MotionLine();
		motion.start();
		ActionMoveCursor.moveTo(motion.targetPosition);
	}

	static lineEnd(): void {
		const motion = new MotionLine();
		motion.end();
		ActionMoveCursor.moveTo(motion.targetPosition);
	}

	static documentStart(): void {
		const motion = new MotionDocument();
		motion.start();
		ActionMoveCursor.moveTo(motion.targetPosition);
	}

	static documentEnd(): void {
		const motion = new MotionDocument();
		motion.end();
		ActionMoveCursor.moveTo(motion.targetPosition);
	}
}