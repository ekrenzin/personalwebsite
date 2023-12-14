<script lang="ts">
	import CommentBubble from './CommentBubble.svelte';
	import type { Comment } from './Comments';
	export let comments: Array<Comment> = [];

	const noCommentTemplate: Comment = {
		CommentID: 0,
		User: 'System',
		CommentText: 'No comments yet, you could be the first to comment!',
		UpdatedAt: ''
	};
</script>

{#if comments}
	<div class="container mx-auto my-10">
		{#each comments as comment}
			<CommentBubble {comment} />
		{:else}
			<CommentBubble comment={noCommentTemplate} />
		{/each}
	</div>
{/if}

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: flex-start; /* Aligns bubbles to the left */
		width: 100%;
		overflow: auto;
	}
</style>
