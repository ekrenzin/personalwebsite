<script lang="ts">
	import type { Comment } from './Comments';
    import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { cleanMD } from '$lib/utils/markdown';
	import cheerio from 'cheerio';
	export let comment: Comment;

    const images = writable([]);
	let text = comment.CommentText;

    onMount(() => {
		const $ = cheerio.load(comment.CommentText);
		const imgs = $('img');
		const imgSrcs = [];
		imgs.each((i, img) => {
			imgSrcs.push(img.attribs.src);
		});
		images.set(imgSrcs);

		// remove all html content from text
		text = $.text();

    });

</script>

<div class="comment-container shadow-md rounded-lg">
	<div class="comment-header font-semibold text-lg mb-2">{comment.User}</div>
	<div class="text-sky-300 text-sm mb-2">{comment.UpdatedAt}</div>
	<p class="comment-body">{@html cleanMD(text)}</p>
	{#each $images as image}
		<img src="{image}" alt="comment" class="my-2" />
	{/each}
</div>

<style>
	.comment-container {
		width: 100%;
		background-color: #f0f0f010; /* Light grey background */
		border-radius: 20px; /* Rounded corners for bubble effect */
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
		margin-bottom: 1rem; /* Space between bubbles */
		padding: 1rem; /* Padding inside the bubble */
		word-wrap: break-word; /* Ensures text wraps inside the bubble */
		text-align: left;
	}

	img {
		max-width: 200px;
		max-height: 200px;
		object-fit: contain;
	}
</style>
