import {Motion} from './Motion';

export class MotionDocument extends Motion {

    static start(): Motion {
        const obj = new MotionDocument();
        obj.translate(-Infinity, -Infinity);
        return obj;
    }

    static end(): Motion {
        const obj = new MotionDocument();
        obj.translate(+Infinity, +Infinity);
        return obj;
    }

}
