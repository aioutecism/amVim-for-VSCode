import {Motion} from './Motion';

export class MotionDocument extends Motion {

	start(): void {
		this.translate(-Infinity, -Infinity);
	}

	end(): void {
		this.translate(+Infinity, +Infinity);
	}

}
