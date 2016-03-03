export const alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
export const numbers = '1234567890'.split('');
export const vkOems = [
    'vk_oem_1', 'vk_oem_2', 'vk_oem_3', 'vk_oem_4', 'vk_oem_5', 'vk_oem_6', 'vk_oem_7', 'vk_oem_102',
    'vk_oem_minus', 'vk_oem_plus', 'vk_oem_comma', 'vk_oem_period',
];

export const raws = [].concat(
    alphabets,
    numbers,
    vkOems,

    'space enter tab backspace delete escape'
        .split(' '),

    numbers
        .map(key => `shift+${key}`),

    vkOems
        .map(key => `shift+${key}`),

    'enter'
        .split(' ').map(key => `shift+${key}`),

    'bw'
        .split('').map(key => `alt+${key}`),

    'cruw'
        .split('').map(key => `ctrl+${key}`)
);
