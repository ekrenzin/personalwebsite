<script lang="ts">
	import { fetchComments } from './Comments';
	import { onMount } from 'svelte';
	import CommentList from './CommentList.svelte';
	import AddCommentSection from './AddCommentSection.svelte';
	import type { Comment } from './Comments';
	
	export let source = 'test';
	export let hidden = true;

	let inititalized = false;
	let comments: Array<Comment> = [];
	

	onMount(() => {
		if (!inititalized) {
			inititalized = true;
			handleComments(source);
		}
	});

	async function handleComments(src: string) {
		if (!inititalized) return;
		const _comments = await fetchComments(src);
		comments = _comments;
	}

	$: handleComments(source);
</script>

<section>
	<h2>Comments</h2>
	{#if hidden}
	<details>
		<summary>Click to see comments</summary>
		<CommentList {comments} />
		<AddCommentSection {source} {handleComments} />
	</details>
	{:else}
		<CommentList {comments} />
		<AddCommentSection {source} {handleComments} />
	{/if}
</section>

<style>
	section {
		max-width: 1000px;
		margin: 0 auto;
		padding: 1rem;
		margin-top: 1rem;
		border-radius: 0.5rem;
	}
</style>
