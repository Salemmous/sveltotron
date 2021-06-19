module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
	},
	variants: {
		borderWidth: ['responsive', 'hover', 'focus'],
	},
	plugins: [],
};
