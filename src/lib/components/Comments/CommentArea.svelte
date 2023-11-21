<script lang="ts">
	import { fetchComments } from './Comments';
	import { onMount } from 'svelte';
	import CommentList from './CommentList.svelte';
	import AddCommentSection from './AddCommentSection.svelte';
	import type { Comment } from './Comments';
	
	export let source: string;
	export let hidden = true;

	let inititalized = false;
	let comments: Array<Comment> = [];
	

	onMount(() => {
		if (!inititalized) {
			inititalized = true;
			handleComments();
		}
	});

	async function handleComments() {
		if (!source) return;
		if (!inititalized) return;
		const _comments = await fetchComments(source);
		comments = _comments.sort((a, b) => {
			return new Date(b.UpdatedAt).getTime() - new Date(a.UpdatedAt).getTime();
		});
	}

	async function toggleSort() {
		comments = comments.reverse();
	}
	

</script>

<section>
	<h2>Comments</h2>
	<!-- refresh button -->
	{#if hidden}
	<details>
		<button class="bg-blue-700  hover:bg-blue-800 p-2 rounded" on:click={handleComments} aria-label="Refresh comments">
		Refesh
		</button>
		<!-- sort button -->
		<button class="bg-blue-700  hover:bg-blue-800 p-2 rounded" on:click={toggleSort} aria-label="Sort comments">
		Toggle Sort
		</button>
		{#key comments}
		<summary>Click to see comments</summary>
		<CommentList {comments} />
		<AddCommentSection {source} {handleComments} />
		{/key}
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
