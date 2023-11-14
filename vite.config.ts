import { sveltekit } from '@sveltejs/kit/vite';
import Markdown from 'vite-plugin-md';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit(), Markdown()],
	assetsInclude: ['**/*.glb', '**/*.md'],
};

export default config;
