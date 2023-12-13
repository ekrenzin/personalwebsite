// src/routes/api/posts/+server.js
import { fetchMarkdownPosts, fetchMarkdownPost, searchPosts } from '$lib/utils';
import { json } from '@sveltejs/kit';

export const GET = async ({ fetch, url }) => {
	//if search query is present, return search results using searchPosts
	let searchQuery = url.searchParams.get('search');

	if (searchQuery) {
		// Perform search if a query is present
		const searchResults = await searchPosts(fetch, searchQuery);
		return json(searchResults);
	} else {
		// Fetch and return all posts if no search query is present
		const allPosts = await fetchMarkdownPosts(fetch);
		return json(allPosts);
	}
};

export const POST = async ({ fetch, request }) => {
	const { prefix, suffix } = await request.json();
	const data = await fetchMarkdownPost(fetch, { prefix, suffix });
	const { post, nextPost, previousPost, currentPost } = data;
	return json({ post, nextPost, previousPost, currentPost });
}

