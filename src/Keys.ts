export const characters = [].concat(
	'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()`~-_=+[{]}\\|;:\'",<.>/?'
		.split(''),

	'space enter backspace'
		.split(' ')
);

export const all = characters.concat(
	'escape'
		.split(' '),

	'enter'
		.split(' ').map(key => `shift+${key}`),

	'bw'
		.split('').map(key => `alt+${key}`),

	'[bdefruvwy'
		.split('').map(key => `ctrl+${key}`)
);