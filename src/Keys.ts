export const raws = [].concat(
    'backspace delete escape'
        .split(' '),

    'cruw'
        .split('').map(key => `ctrl+${key}`)
);
