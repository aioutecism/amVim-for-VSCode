import {Motion} from './Motion'

export class MotionLine extends Motion {
	start(): void {
		this.relative(0, -Infinity);
	}

	end(): void {
		this.relative(0, +Infinity);
	}
}
