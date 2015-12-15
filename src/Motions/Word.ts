import {Motion, MotionWordPosition} from './Motion';

export class MotionWord extends Motion {

	nextStart(): void {
		this.translate(0, 0, MotionWordPosition.NEXT_START);
	}

	nextEnd(): void {
		this.translate(0, 0, MotionWordPosition.NEXT_END);
	}

	prevStart(): void {
		this.translate(0, 0, MotionWordPosition.PREV_START);
	}

}
