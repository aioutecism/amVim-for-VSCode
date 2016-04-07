export const raws = [].concat(
    'backspace delete escape'
        .split(' '),

    'cruwfb'
        .split('').map(key => `ctrl+${key}`)
);
