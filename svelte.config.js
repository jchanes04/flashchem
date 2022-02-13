import preprocess from 'svelte-preprocess';
import node from '@sveltejs/adapter-node'
import fs from 'fs'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		adapter: node(),
		files: {
			lib: 'src/lib'
		},
		vite: {
			server: {
				https: {
					key: fs.readFileSync('./localhost-key.pem'),
					cert: fs.readFileSync('./localhost.pem')
				}
			}
		}
	}
};

export default config;
