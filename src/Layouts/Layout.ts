import * as US_QWERTY from './US_QWERTY';

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

}

Layout.register(US_QWERTY.id, US_QWERTY.map);
