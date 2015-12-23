import {Motion} from './Motion';

export class MotionCharacter extends Motion {

    left(n = 1): void {
        this.translate(0, -n);
    }

    right(n = 1): void {
        this.translate(0, +n);
    }

    up(n = 1): void {
        this.translate(-n, 0);
    }

    down(n = 1): void {
        this.translate(+n, 0);
    }

}
