import {Motion} from './Motion';

export class MotionCharacter extends Motion {

    left(args: {n: number} = {n: 1}): Motion {
        this.translate(0, -args.n);
        return this;
    }

    right(args: {n: number} = {n: 1}): Motion {
        this.translate(0, +args.n);
        return this;
    }

    up(args: {n: number} = {n: 1}): Motion {
        this.translate(-args.n, 0);
        return this;
    }

    down(args: {n: number} = {n: 1}): Motion {
        this.translate(+args.n, 0);
        return this;
    }

}
