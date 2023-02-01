import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	assetsInclude: ['**/*.glb'],
	build: {
		outDir: "cloudflare"
	}
};

export default config;
