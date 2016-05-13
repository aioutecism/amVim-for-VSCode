export enum WordCharacterKind {Regular, Separator, Blank};

export class UtilWord {
    public static blankSeparators = ' \f\n\r\t\v​\u00a0\u1680​\u180e\u2000​\u2001​\u2002​\u2003​\u2004\u2005​\u2006​\u2007​\u2008\u2009​\u200a​\u2028\u2029\u202f\u205f​\u3000\ufeff';
    public static characterKindCache: {[key: number]: WordCharacterKind};

    public static updateCharacterKindCache(wordSeparators: string): void {
        this.characterKindCache = {};

        for (let i = 0; i < this.blankSeparators.length; i++) {
            this.characterKindCache[this.blankSeparators.charCodeAt(i)] = WordCharacterKind.Blank;
        }

        for (let i = 0, len = wordSeparators.length; i < len; i++) {
            this.characterKindCache[wordSeparators.charCodeAt(i)] = WordCharacterKind.Separator;
        }
    }

    public static getCharacterKind(charCode: number, useBlankSeparatedStyle: boolean): WordCharacterKind {
        let characterKind = UtilWord.characterKindCache[charCode];

        if (characterKind === undefined) {
            characterKind = WordCharacterKind.Regular;
        }

        if (useBlankSeparatedStyle) {
            // Treat separator as regular character.
            if (characterKind === WordCharacterKind.Separator) {
                characterKind = WordCharacterKind.Regular;
            }
        }

        return characterKind;
    }
}
