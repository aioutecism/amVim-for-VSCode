import {Motion} from './Motion';

export class MotionDocument extends Motion {
	start(): void {
		this.relative(-Infinity, -Infinity);
	}

	end(): void {
		this.relative(+Infinity, +Infinity);
	}
}
