import {Motion} from './Motion';

export class MotionCharacter extends Motion {
	left(): void {
		this.relative(0, -1);
	}

	right(): void {
		this.relative(0, +1);
	}

	up(): void {
		this.relative(-1, 0);
	}

	down(): void {
		this.relative(+1, 0);
	}
}
