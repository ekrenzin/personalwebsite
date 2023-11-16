<script lang="ts">
	import { fetchComments, postComment } from './Comments';
	import { onMount } from 'svelte';
	import CommentList from './CommentList.svelte';
	import AddCommentSection from './AddCommentSection.svelte';
	import type { Comment } from './Comments';
	export let source = 'test';

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
    <details>
        <summary>Click to see comments</summary>
	<CommentList {comments} />
	<AddCommentSection {source} {handleComments} />
    
</details>
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
