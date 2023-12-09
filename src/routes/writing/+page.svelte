<script lang="ts">
	import BlogItem from './BlogItem.svelte';
	import '../../md.css';
	import CommentArea from '$lib/components/Comments/CommentArea.svelte';
	import Carousel from './Carousel.svelte';
	import Videos from './videos.svelte';

	interface mdData {
		title: string;
		preview: string;
		url: string;
	}

	interface blogData {
		essays: Array<mdData>;
		stories: Array<mdData>;
		poems: Array<mdData>;
		musings: Array<mdData>;
	}

	export let data: blogData;
	let categories = Object.keys(data);
</script>

<svelte:head>
	<title>Writing | eankrenzin.com</title>
	<meta name="description" content="Ean Krenzin-Blank's personal website" />
</svelte:head>
<section class="max-w-sm mx-auto text-center my-12">
    <h1 class="text-8xl font-semibold mb-4">Writing</h1>
    <h2 class="text-2xl font-medium mb-6">
        reflection, philosphy, and art.
    </h2>
    <p class="text-gray-400">
		Creativity finds expression in our bond with technology, where the art of storytelling is reflected as much by how it is presented as the philosophy behind it.
		</p>
		
	<p class="text-gray-400">
		When viewing this site, and my work, please keep in mind the technology wrapping it. The purpose is in the presentation.
		My poetry, musings, essays, and thoughts are the threads weaving together to form a digital canvas to paint an idea.
		With that said, much of this is graphic, it is intended to be provactive in order to "prompt" a response.
		<br/>
		<br/>
		Your experience with the diverse themes should be deeply immersive, enhanced by the guidance of your AI assistant.
		To experience a sense communcaition with Self and Other, with AI.
		While AI is primitive such than an LLM is akin to a voice recorder, it is still possible to
		experience a sense of other, thus acknowleding the existence of nascent AI through
		an interaction with present technology.
    </p>
    <p class="text-gray-400">
		<b>
        Do not take anything you read here as serious, beyond the experience of technology.
	</b>
    </p>
</section>
<Videos />
{#each categories as category}
<section id={category}>
    {#if data[category].length > 0}
        <Carousel {category} posts={data[category]} />
    {/if}
</section>
{/each}
<CommentArea source="writing" hidden={true}/>

<section>
	<h1>All Content</h1>
{#each categories as category}
	{#if data[category].length > 0}

			{#each data[category] as post, index}
				<div class="post">
					<BlogItem markdownContent={post} {index} />
				</div>
			{/each}
	{/if}
{/each}
</section>
<style>
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}

	section {
		margin: auto;
		padding: 2rem;
		max-width: 1000px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.post {
		width: 100%;
	}
	.category-nav {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1rem;
		padding: 1rem;
	}

	.category-button {
		padding: 0.5rem 1rem;
		border: none;
		cursor: pointer;
		color: #fff;
		border-radius: 5px;
		text-decoration: underline;
		transition: 0.5s;
	}

	.category-button:hover{
		transform: scale(1.1);
	}
</style>
