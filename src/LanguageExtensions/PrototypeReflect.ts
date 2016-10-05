function isObject(x: any): boolean {
    return typeof x === 'object' ? x !== null : typeof x === 'function';
}

function isUndefined(x: any): boolean {
    return x === undefined;
}

function isConstructor(x: any): boolean {
    return typeof x === 'function';
}

function isPrototypeExists(x: any): boolean {
    return x !== null
        && x !== undefined
        && x.prototype !== null
        && x.prototype !== undefined;
}

/**
 * Prototype version of https://github.com/rbuckton/ReflectDecorators/ (Partial)
 * Save metadata in prototype so we can get it without context.
 */
export class PrototypeReflect {

    private static metadataKey = Symbol('ReflectMetadata');

    /**
      * A default metadata decorator factory that can be used on a class, class member, or parameter.
      * @param metadataKey The key for the metadata entry.
      * @param metadataValue The value for the metadata entry.
      * @returns A decorator function.
      * @remarks
      * If `metadataKey` is already defined for the target and target key, the
      * metadataValue for that key will be overwritten.
      * @example
      *
      *     // constructor
      *     @PrototypeReflect.metadata(key, value)
      *     class C {
      *     }
      *
      *     // property (on constructor)
      *     class C {
      *         @PrototypeReflect.metadata(key, value)
      *         static staticProperty;
      *     }
      *
      *     // property (on prototype)
      *     class C {
      *         @PrototypeReflect.metadata(key, value)
      *         property;
      *     }
      *
      *     // method (on constructor)
      *     class C {
      *         @PrototypeReflect.metadata(key, value)
      *         static staticMethod() { }
      *     }
      *
      *     // method (on prototype)
      *     class C {
      *         @PrototypeReflect.metadata(key, value)
      *         method() { }
      *     }
      */
    static metadata(key: string | symbol, value: any) {
        function decorator(targetObject: Function): void;
        function decorator(targetObject: Object, targetKey: string | symbol): void;
        function decorator(targetObject: Object, targetKey?: string | symbol): void {
            if (!isUndefined(targetKey)) {
                if (!isObject(targetObject)) {
                    throw new TypeError();
                }
                PrototypeReflect.defineMetadata(key, value, targetObject[targetKey!]);
            }
            else {
                if (!isConstructor(targetObject)) {
                    throw new TypeError();
                }
                PrototypeReflect.defineMetadata(key, value, targetObject);
            }
        };

        return decorator;
    }

    static defineMetadata(key: string | symbol, value: any, target: any): void {
        if (!isPrototypeExists(target)) {
            throw new TypeError();
        }

        if (target.prototype[PrototypeReflect.metadataKey] === undefined) {
            target.prototype[PrototypeReflect.metadataKey] = {};
        }

        target.prototype[PrototypeReflect.metadataKey][key] = value;
    }

    static getMetadata(key: string | symbol, target: any): any {
        if (!isPrototypeExists(target)) {
            return undefined;
        }

        try {
            // TODO: Currently using try-catch to workaround wired bug where target.prototype becomes undefined after previous check.
            // Using https://github.com/rbuckton/ReflectDecorators may solve the problem since they don't save things inside prototype'
            return (target.prototype[PrototypeReflect.metadataKey] === undefined)
                ? undefined
                : target.prototype[PrototypeReflect.metadataKey][key];
        }
        catch (error) {
            return undefined;
        }
    }

}
