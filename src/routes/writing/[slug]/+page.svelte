<script>
	import { loadHtml } from '$lib/utils/markdown';
	import { showChat, sendMessage } from '$lib/components/AiAssistant/chatStore';
	import CommentArea from '$lib/components/Comments/CommentArea.svelte';
	import { page } from '$app/stores';
	import PowerfulArticle from '$lib/components/PowerfulArticle.svelte';
	import { AnalyzeWithAI, GenerateImageWithAI } from '$lib/components/AiAssistant/AnalyzeAI';

	//dynamically import the markdown file based on the slug
	export let data;
</script>


<div class="container mx-auto page p-4 text-gray-300 px-10">
	<!-- if the page.route includes poem -->
	<div align={$page.url.toString().includes('poem') ? 'center' : 'left'}>
		<PowerfulArticle html={loadHtml(data.post)} />
	</div>

	<!-- centered button to go back -->
	<div class="flex-row">
		<button
			class="mt-4 bg-black hover:bg-gray-900 text-white py-2 px-4 rounded"
			on:click={() => AnalyzeWithAI(data.post)}
		>
			Analyze with AI
		</button>
		<button
			class="mt-4 bg-black hover:bg-gray-900 text-white py-2 px-4 rounded"
			on:click={() => GenerateImageWithAI(data.post)}
		>
			Generate Image with AI
		</button>
	</div>
	<div class="flex-row mt-4">
		{#if data && data.previousPost && data.previousPost.url}
			<a class="previous-post" href={`/${data.previousPost.url}`}>← Previous</a>
		{/if}
		<a class="back" href={`/writing#${data.slug}`}>Back</a>
		{#if data && data.nextPost && data.nextPost.url}
			<a class="next-post" href={`/${data.nextPost.url}`}>Next →</a>
		{/if}
	</div>
	{#key data.slug}
		<CommentArea source={data.slug} hidden={false} />
	{/key}
</div>

<style>
	.page {
		position: relative;
		border-radius: 1rem;
		max-width: 1000px;
	}

	.flex-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 1rem;
		align-items: center;
		flex-wrap: wrap;
	}

	.flex-row a {
		text-decoration: underline;
	}

	button {
		transition: 0.5s;
	}
</style>
