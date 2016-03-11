import * as US_QWERTY from './US_QWERTY';
import * as DE_CH_QWERTZ from './DE_CH_QWERTZ';

export interface LayoutMap {
    [key: string]: string;
}

export class Layout {

    private static id: string;
    private static layouts: {[id: string]: LayoutMap} = {};

    static use(id: string): void {
        if (this.layouts[id]) {
            this.id = id;
        }
        else {
            throw new Error(`Layout not registered: ${id}`);
        }
    }

    static register(id: string, map: LayoutMap): void {
        this.layouts[id] = map;
    }

    static transformKey(key: string): string {
        if (this.id) {
            return this.layouts[this.id][key] || key;
        }
        else {
            return key;
        }
    }

    static getAllTransformedKeys(): string[] {
        let transformedKeys: string[] = [];

        Object.keys(this.layouts).forEach(id => {
            const layout = this.layouts[id];

            Object.keys(layout).forEach(key => {
                const transformedKey = layout[key];

                if (transformedKeys.indexOf(transformedKey) == -1) {
                    transformedKeys.push(transformedKey);
                }
            });
        });

        return transformedKeys;
    }

}

Layout.register(US_QWERTY.id, US_QWERTY.map);
Layout.register(DE_CH_QWERTZ.id, DE_CH_QWERTZ.map);
