import {Motion} from './Motion';

export class MotionLine extends Motion {

	start(): void {
		this.translate(0, -Infinity);
	}

	end(): void {
		this.translate(0, +Infinity);
	}

}
