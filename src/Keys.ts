export const alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
export const numbers = '1234567890'.split('');

export const raws = [].concat(
    'tab backspace delete escape'
        .split(' '),

    'cruw'
        .split('').map(key => `ctrl+${key}`)
);
