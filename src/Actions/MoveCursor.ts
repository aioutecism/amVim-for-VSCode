import {window, Position, Selection} from 'vscode'
import {MotionCharacter} from '../Motions/Character'

export class ActionMoveCursor {
	private static moveTo(position: Position): void {
		const activeTextEditor = window.activeTextEditor;

		if (! activeTextEditor) {
			return;
		}

		activeTextEditor.selection = new Selection(position, position);
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
}