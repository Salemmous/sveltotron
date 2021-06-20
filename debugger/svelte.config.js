import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';

const dev = process.env.NODE_ENV == 'development';

/** @type {import('@sveltejs/kit').Config} */
export default {
	kit: {
		//adapter: node()
		adapter: adapter(),
		target: '#svelte',

		vite: {
			compilerOptions: { dev },
		},
	},

	preprocess: [
		preprocess({
			postcss: true,
		}),
	],
};
