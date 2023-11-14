// src/routes/api/posts/+server.js
import { fetchMarkdownPosts, fetchMarkdownPost } from '$lib/utils';
import { json } from '@sveltejs/kit';

export const GET = async ({fetch}) => {
	const allPosts = await fetchMarkdownPosts(fetch);
	return json(allPosts);
};

export const POST = async ({fetch, request}) => {
	const { prefix, suffix } = await request.json();
	const {post, nextPost, previousPost} = await fetchMarkdownPost(fetch, {prefix, suffix});
	return json({post, nextPost, previousPost});
}

