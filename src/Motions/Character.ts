import {Motion} from './Motion';

export class MotionCharacter extends Motion {

    left(n = 1): Motion {
        this.translate(0, -n);
        return this;
    }

    right(n = 1): Motion {
        this.translate(0, +n);
        return this;
    }

    up(n = 1): Motion {
        this.translate(-n, 0);
        return this;
    }

    down(n = 1): Motion {
        this.translate(+n, 0);
        return this;
    }

}
