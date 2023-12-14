<script lang="ts">
	import { fetchComments } from './Comments';
	import { onMount } from 'svelte';
	import CommentList from './CommentList.svelte';
	import AddCommentSection from './AddCommentSection.svelte';
	import RefreshIcon from '$lib/assets/icons/refresh.svg';
	import SortIcon from '$lib/assets/icons/sort.svg';
	import { tooltip } from '$lib/utils/tooltip';
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
	<h1>Comments</h1>
	<!-- refresh button -->
	{#if hidden}
	<details>
		<div class="buttons">
		<button use:tooltip title="refresh comments" class="icon-button" on:click={handleComments}>
			<img src={RefreshIcon} alt="refresh comments" />
		</button>
		<button use:tooltip title="sort comments" class="icon-button" on:click={toggleSort}>
			<img src={SortIcon} alt="sort comments" />
		</button>
	</div>
		{#key comments}
		<summary>Click to see comments</summary>
		<CommentList {comments} />
		<AddCommentSection {source} {handleComments} />
		{/key}
	</details>
	{:else}
		<div class="buttons">
		<button use:tooltip title="refresh comments" class="icon-button" on:click={handleComments}>
			<img src={RefreshIcon} alt="refresh comments" />
		</button>
		<button use:tooltip title="sort comments" class="icon-button" on:click={toggleSort}>
			<img src={SortIcon} alt="sort comments" />
		</button>
	</div>
		<AddCommentSection {source} {handleComments} />
		<CommentList {comments} />
	{/if}
</section>

<style>
	h2, summary {
		text-align: center;
	}
	
	section {
		position: relative;
		width: 100%;
		max-width: 1000px;
		margin: 0 auto;
		padding: 1rem;
		margin-top: 1rem;
		border-radius: 0.5rem;
		text-align: center;
	}

	summary {
		cursor: pointer;
		text-align: center;
	}
	details {
		position: relative;
	}

	.buttons {
		position: absolute;
		top: 0;
		right: 0;
	}

	.icon-button {
		height: 2rem;
		width: 2rem;
	}

	/* max width 600 then position buttons  */
	@media (max-width: 600px) {
		.buttons {
			position: relative;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: flex-end;
			gap: 1rem;
		}
	}
</style>
