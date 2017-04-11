export enum WordCharacterKind {
    Regular,
    Separator,
    Blank,
    JapanesePunctuation,
    Hiragana,
    Katakana,
    FullWidthRomanOrHalfWidthKatakana,
    Kanji,
}

export class UtilWord {

    private static blankSeparators = ' \f\n\r\t\v​\u00a0\u1680​\u180e\u2000​\u2001​\u2002​\u2003​\u2004\u2005​\u2006​\u2007​\u2008\u2009​\u200a​\u2028\u2029\u202f\u205f​\u3000\ufeff';

    private static japanesePunctuationCharCodeRange = [0x3000, 0x303F];
    private static hiraganaCharCodeRange = [0x3040, 0x309F];
    private static katakanaCharCodeRange = [0x30A0, 0x30FF];
    private static fullWidthRomanOrHalfWidthKatakanaCharCodeRange = [0xFF00, 0xFFEF];
    private static kanjiCharCodeRange = [0x4E00, 0x9FAF];
    private static rareKanjiCharCodeRange = [0x3400, 0x4DBF];

    private static characterKindCache: {[key: number]: WordCharacterKind};

    static updateCharacterKindCache(wordSeparators: string): void {
        this.characterKindCache = {};

        for (let i = 0; i < this.blankSeparators.length; i++) {
            this.characterKindCache[this.blankSeparators.charCodeAt(i)] = WordCharacterKind.Blank;
        }

        for (let i = 0, len = wordSeparators.length; i < len; i++) {
            this.characterKindCache[wordSeparators.charCodeAt(i)] = WordCharacterKind.Separator;
        }
    }

    static getCharacterKind(charCode: number, useBlankSeparatedStyle: boolean): WordCharacterKind {
        let characterKind = UtilWord.characterKindCache[charCode];

        if (characterKind === undefined) {
            if (charCode >= this.japanesePunctuationCharCodeRange[0] && charCode <= this.japanesePunctuationCharCodeRange[1]) {
                characterKind = WordCharacterKind.JapanesePunctuation;
            }
            else if (charCode >= this.hiraganaCharCodeRange[0] && charCode <= this.hiraganaCharCodeRange[1]) {
                characterKind = WordCharacterKind.Hiragana;
            }
            else if (charCode >= this.katakanaCharCodeRange[0] && charCode <= this.katakanaCharCodeRange[1]) {
                characterKind = WordCharacterKind.Katakana;
            }
            else if (charCode >= this.fullWidthRomanOrHalfWidthKatakanaCharCodeRange[0] && charCode <= this.fullWidthRomanOrHalfWidthKatakanaCharCodeRange[1]) {
                characterKind = WordCharacterKind.FullWidthRomanOrHalfWidthKatakana;
            }
            else if (charCode >= this.kanjiCharCodeRange[0] && charCode <= this.kanjiCharCodeRange[1]) {
                characterKind = WordCharacterKind.Kanji;
            }
            else if (charCode >= this.rareKanjiCharCodeRange[0] && charCode <= this.rareKanjiCharCodeRange[1]) {
                characterKind = WordCharacterKind.Kanji;
            }
            else {
                characterKind = WordCharacterKind.Regular;
            }
        }

        if (useBlankSeparatedStyle) {
            // Treat all except blank as regular character.
            if (characterKind !== WordCharacterKind.Blank) {
                characterKind = WordCharacterKind.Regular;
            }
        }

        return characterKind;
    }

}
