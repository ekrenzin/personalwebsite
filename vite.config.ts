import { sveltekit } from '@sveltejs/kit/vite';
import prebuildScript from './prebuild-custom-vite-plugin';
import Markdown from 'vite-plugin-md';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit(), Markdown(), prebuildScript()],
	assetsInclude: ['**/*.glb', '**/*.md'],
};

export default config;
