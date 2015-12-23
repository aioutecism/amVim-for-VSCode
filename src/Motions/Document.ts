import {Motion} from './Motion';

export class MotionDocument extends Motion {

    start(): Motion {
        this.translate(-Infinity, -Infinity);
        return this;
    }

    end(): Motion {
        this.translate(+Infinity, +Infinity);
        return this;
    }

}
