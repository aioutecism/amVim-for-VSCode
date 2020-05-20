function isObject(x: any): boolean {
    return typeof x === 'object' ? x !== null : typeof x === 'function';
}

function isUndefined(x: any): boolean {
    return x === undefined;
}

function isConstructor(x: any): boolean {
    return typeof x === 'function';
}

type Metadata = Map<string | symbol, any>;

/**
 * Static version of https://github.com/rbuckton/ReflectDecorators/ (Partial)
 * Save metadata as static so we can get it without context.
 */
export class StaticReflect {
    private static metadataMap = new Map<any, Metadata>();

    private static obtainMetadata(
        target: any,
        shouldCreateWhenNotExist: boolean = false,
    ): Metadata | undefined {
        let metadata = this.metadataMap.get(target);

        if (!metadata && shouldCreateWhenNotExist) {
            metadata = new Map();
            this.metadataMap.set(target, metadata);
        }

        return metadata;
    }

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
     *     @StaticReflect.metadata(key, value)
     *     class C {
     *     }
     *
     *     // property (on constructor)
     *     class C {
     *         @StaticReflect.metadata(key, value)
     *         static staticProperty;
     *     }
     *
     *     // property (on prototype)
     *     class C {
     *         @StaticReflect.metadata(key, value)
     *         property;
     *     }
     *
     *     // method (on constructor)
     *     class C {
     *         @StaticReflect.metadata(key, value)
     *         static staticMethod() { }
     *     }
     *
     *     // method (on prototype)
     *     class C {
     *         @StaticReflect.metadata(key, value)
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
                StaticReflect.defineMetadata(key, value, targetObject[targetKey!]);
            } else {
                if (!isConstructor(targetObject)) {
                    throw new TypeError();
                }
                StaticReflect.defineMetadata(key, value, targetObject);
            }
        }

        return decorator;
    }

    static defineMetadata(key: string | symbol, value: any, target: any): void {
        const metadata = this.obtainMetadata(target, true);
        metadata!.set(key, value);
    }

    static getMetadata(key: string | symbol, target: any): any {
        const metadata = this.obtainMetadata(target);

        if (metadata !== undefined) {
            return metadata.get(key);
        } else {
            return undefined;
        }
    }
}
