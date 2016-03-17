export const raws = [].concat(
    'tab backspace delete escape'
        .split(' '),

    'cruw'
        .split('').map(key => `ctrl+${key}`)
);
