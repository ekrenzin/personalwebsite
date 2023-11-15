<script>
	import { loadHtml } from '$lib/utils/markdown';
    import { showChat, sendMessage } from '$lib/components/AiAssistant/chatStore';

	//dynamically import the markdown file based on the slug
	export let data;

    function AnalyzeWithAI() {
		$showChat = true;
		sendMessage(`Analyze`, window.location.pathname, data.post);
    }
</script>

<div class="container mx-auto page p-4 p-4 text-gray-300">
	<article class="prose lg:prose-xl">
		{@html loadHtml(data.post)}
	</article>
	<!-- centered button to go back -->
    <button class="bg-gray-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-10" on:click={AnalyzeWithAI}>
        Analyze with AI
    </button>
	<div class="flex-row">
		{#if data && data.previousPost && data.previousPost.url}
			<a class="previous" href={`/${data.previousPost.url}`}>← Previous</a>
		{/if}
		<a class="back" href={`/writing#${data.slug}`}>Back</a>
		{#if data && data.nextPost && data.nextPost.url}
			<a class="forward" href={`/${data.nextPost.url}`}>Next →</a>
		{/if}
	</div>
</div>

<style>
	.page {
		position: relative;
		border-radius: 1rem;
		max-width: 1000px;
	}

	article {
		font-family: 'Times New Roman', Times, serif;
	}

	.flex-row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
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
