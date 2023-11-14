// src/routes/api/posts/+server.js
import { fetchMarkdownPosts, fetchMarkdownPost } from '$lib/utils';
import { json } from '@sveltejs/kit';

export const GET = async () => {
	const allPosts = await fetchMarkdownPosts();
	return json(allPosts);
};

export const POST = async ({request}) => {
	const { prefix, suffix } = await request.json();
	const post = await fetchMarkdownPost(prefix, suffix);
	return json(post);
}

