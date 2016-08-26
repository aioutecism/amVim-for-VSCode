import {Position} from 'vscode';
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

    static up(args: {n?: number} = {}): Motion {
        args.n = args.n === undefined ? 1 : args.n;

        const obj = new MotionCharacter();
        obj.translate(-args.n, 0);

        obj.isCharacterUpdated = false;

        return obj;
    }

    static down(args: {n?: number} = {}): Motion {
        args.n = args.n === undefined ? 1 : args.n;

        const obj = new MotionCharacter();
        obj.translate(+args.n, 0);

        obj.isCharacterUpdated = false;

        return obj;
    }

    apply(from: Position, option: {preferedColumn?: number} = {}): Position {
        if (! this.isCharacterUpdated && option.preferedColumn !== undefined) {
            from = from.with(undefined, option.preferedColumn);
        }

        return super.apply(from);
    }

}
