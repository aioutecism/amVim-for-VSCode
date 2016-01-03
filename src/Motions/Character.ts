import {Motion} from './Motion';

export class MotionCharacter extends Motion {

    static left(args: {n?: number} = {}): Motion {
        args.n = args.n === undefined ? 1 : args.n;

        const obj = new MotionCharacter();
        obj.translate(0, -args.n);

        return obj;
    }

    static right(args: {n?: number} = {}): Motion {
        args.n = args.n === undefined ? 1 : args.n;

        const obj = new MotionCharacter();
        obj.translate(0, +args.n);

        return obj;
    }

    static appendRight(args: {n?: number} = {}): Motion {
        args.n = args.n === undefined ? 1 : args.n;

        const obj = new MotionCharacter();
        obj.translate(0, +args.n, {eofAppend: true});

        return obj;
    }

    static up(args: {n?: number} = {}): Motion {
        args.n = args.n === undefined ? 1 : args.n;

        const obj = new MotionCharacter();
        obj.translate(-args.n, 0);

        return obj;
    }

    static down(args: {n?: number} = {}): Motion {
        args.n = args.n === undefined ? 1 : args.n;

        const obj = new MotionCharacter();
        obj.translate(+args.n, 0);

        return obj;
    }

}
