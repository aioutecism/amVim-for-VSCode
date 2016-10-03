export class UtilCharacter {

    static switchCase(from: string): string {
        let to = '';

        for (let i = 0; i < from.length; i++) {
            const charCode = from.charCodeAt(i);
            if (charCode >= 97 && charCode <= 122) {
                to += String.fromCharCode(charCode - 32);
            }
            else if (charCode >= 65 && charCode <= 90) {
                to += String.fromCharCode(charCode + 32);
            }
            else {
                to += from[i];
            }
        }

        return to;
    }

}
