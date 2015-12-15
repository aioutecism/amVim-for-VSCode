import {Motion} from './Motion';

export class MotionCharacter extends Motion {

	left(): void {
		this.translate(0, -1);
	}

	right(): void {
		this.translate(0, +1);
	}

	up(): void {
		this.translate(-1, 0);
	}

	down(): void {
		this.translate(+1, 0);
	}

}
