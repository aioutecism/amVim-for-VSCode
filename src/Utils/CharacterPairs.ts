export class UtilCharacterPairs {

    public static mapToClosingChar =  {
        '\'' : '\'',
        '"'  : '"',
        '<'  : '>',
        '>'  : '>',
        '('  : ')',
        ')'  : ')',
        '['  : ']',
        ']'  : ']',
        '{'  : '}',
        '}'  : '}',
    };

    public static mapToOpeningChar = {
        '\'' : '\'',
        '"'  : '"',
        '>'  : '<',
        '<'  : '<',
        ')'  : '(',
        '('  : '(',
        ']'  : '[',
        '['  : '[',
        '}'  : '{',
        '{'  : '{',
    };
}
