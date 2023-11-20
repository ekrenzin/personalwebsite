<script>
	import { loadHtml } from '$lib/utils/markdown';
	import { showChat, sendMessage } from '$lib/components/AiAssistant/chatStore';
	import CommentArea from '$lib/components/Comments/CommentArea.svelte';
	import { page } from '$app/stores';  
	import BlogItem from '../BlogItem.svelte';
	
	//dynamically import the markdown file based on the slug
	export let data;

	function AnalyzeWithAI() {
		$showChat = true;
		sendMessage(`Analyze`, window.location.pathname, data.post);
	}

</script>

<svelte:head>
    <title>{data.currentPost.title || 'Ean Krenzin-Blank\'s writing'} | eankrenzin.com</title>
    <meta name="description" content={data.currentPost.preview || 'Read Ean\'s writing, analyze with AI, and leave a comment!'} />

    <!-- Open Graph Tags -->
    <meta property="og:title" content={data.currentPost.title || 'Ean Krenzin-Blank\'s writing'} />
    <meta property="og:description" content={data.currentPost.preview || 'Read Ean\'s writing, analyze with AI, and leave a comment!'} />
    <meta property="og:type" content="article" />
    <meta property="og:image" content={data.currentPost.image || '/writing.png'} />
    <meta property="og:url" content={$page.url.toString()} />
	<meta property="og:site_name" content={data.currentPost.title || 'Ean Krenzin-Blank\'s writing'} >

    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={data.currentPost.title || 'Ean Krenzin-Blank\'s writing'} />
    <meta name="twitter:description" content={data.currentPost.preview || 'Read Ean\'s writing, analyze with AI, and leave a comment!'} />
    <meta name="twitter:image" content={data.currentPost.image || '/writing.png'} />

    <!-- Other Tags -->
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charset="UTF-8" />
    <link rel="canonical" href={$page.url.toString()} />
    <meta name="author" content="Ean Krenzin-Blank" />
    <meta name="keywords" content={`AI, Writing, Analysis, Comments, Ean Krenzin-Blank, ${data.currentPost.title}`} />
</svelte:head>

<div class="container mx-auto page p-4 p-4 text-gray-300">
	<article class="prose lg:prose-xl">
		{@html loadHtml(data.post)}
	</article>
	<!-- centered button to go back -->
	<div class="flex-row">
		<button
			class="m-auto bg-gray-800 hover:bg-blue-700 text-white py-2 px-4 rounded mb-10 mt-4"
			on:click={AnalyzeWithAI}
		>
			Analyze with AI
		</button>
	</div>
	<CommentArea source={data.slug} />
	<div class="flex-row">
		{#if data && data.previousPost && data.previousPost.url}
			<a class="previous-post" href={`/${data.previousPost.url}`}>← Previous</a>
		{/if}
		<a class="back" href={`/writing#${data.slug}`}>Back</a>
		{#if data && data.nextPost && data.nextPost.url}
			<a class="next-post" href={`/${data.nextPost.url}`}>Next →</a>
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
