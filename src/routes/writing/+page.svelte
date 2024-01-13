<script lang="ts">
	import BlogItem from './BlogItem.svelte';
	import '../../md.css';
	import CommentArea from '$lib/components/Comments/CommentArea.svelte';
	import Carousel from './Carousel.svelte';
	import Videos from './videos.svelte';
	import {updateWritingStore, writingSettings } from './writingStore';
	import SearchBar from '$lib/components/writing/SearchBar.svelte';

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
	writingSettings.subscribe(console.log)
	
</script>


<section class="max-w-sm mx-auto text-center my-12">
    <h1 class="
	text-4xl
	tracking-tight
	font-extrabold
	sm:text-5xl
	text-gray-50
	md:text-6xl
	pb-4">Writing</h1>
    <h2 class="text-2xl font-medium mb-6 capitalize text-color-cyan">
        reflection, philosphy, and art.
    </h2>
    <p >
		Creativity finds expression in our bond with technology, where the art of storytelling is reflected as much by how it is presented as the philosophy behind it.
		</p>
		
	<p >
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
    <p >
		<i>
        Do not take anything you read here as serious, beyond the experience of technology.
	</i>
    </p>
	<CommentArea source="writing" hidden={true} />
	<!-- <button id="disco-button" class="m-auto bottom-0 left-0 m-4 bg-white hover:bg-pink-600 text-black py-2 px-4 rounded"
	
on:click={() =>updateWritingStore({discoColors: !$writingSettings.discoColors})}>Turn Lights {$writingSettings.discoColors ? "off" : "on"}</button> -->
</section>
<SearchBar />
<Videos />
{#each categories as category}
<section id={category}>
    {#if data[category].length > 0}
        <Carousel {category} posts={data[category]} />
    {/if}
</section>
{/each}

<section>
	<h1 class="
	text-4xl
	tracking-tight
	font-extrabold
	sm:text-5xl
	text-gray-50
	md:text-6xl
	pb-4">All Content</h1>
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
	
	p {
		color: var(--text-color);
	}

	h2 {
		font-weight: 700;
		color: skyblue
	}

	i {
		opacity: 0.8;
	}
</style>
