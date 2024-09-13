<script lang="ts">
	import BlogItem from './BlogItem.svelte';
	import '../../md.css';
	import CommentArea from '$lib/components/Comments/CommentArea.svelte';
	import Carousel from './Carousel.svelte';
	import Videos from './videos.svelte';
	import { updateWritingStore, writingSettings } from './writingStore';
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
</script>

<section class="max-w-sm mx-auto text-center my-12">
	<h1
		class="
	text-4xl
	tracking-tight
	font-extrabold
	sm:text-5xl
	text-gray-50
	md:text-6xl
	pb-4"
	>
		Writing
	</h1>
	<h2 class="text-2xl font-medium mb-6 capitalize text-color-cyan">REDACTED.</h2>
	<CommentArea source="writing" hidden={true} />
	<!-- <button id="disco-button" class="m-auto bottom-0 left-0 m-4 bg-white hover:bg-pink-600 text-black py-2 px-4 rounded"
	
on:click={() =>updateWritingStore({discoColors: !$writingSettings.discoColors})}>Turn Lights {$writingSettings.discoColors ? "off" : "on"}</button> -->
</section>

<!-- <SearchBar />
<Videos />

<section>
	<h1
		class="
	text-4xl
	tracking-tight
	font-extrabold
	sm:text-5xl
	text-gray-50
	md:text-6xl
	pb-4"
	>
		All Content
	</h1>
	{#each data.poems as post, index}
		{console.log(post)}
		<div class="post">
			<BlogItem markdownContent={post} {index} />
		</div>
	{/each}
</section> -->

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
		color: skyblue;
	}

	i {
		opacity: 0.8;
	}
</style>
