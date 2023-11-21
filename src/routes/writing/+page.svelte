<script lang="ts">
	import BlogItem from './BlogItem.svelte';
	import { onMount } from 'svelte';
	import '../../md.css';
	import CommentArea from '$lib/components/Comments/CommentArea.svelte';
	import Carousel from './Carousel.svelte';

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
	<title>Creative Writing | eankrenzin.com</title>
	<meta name="description" content="Ean Krenzin-Blank's personal website" />
</svelte:head>
<section align="center">
	<h1>Hello, and welcome</h1>
	<h2>
		This is a demonstration of artistic expression.
		</h2>
		<p>
		The expression of creativity can be represented through our connection to technology,
		as storytelling is expressed through the presentation as much as the content.
		
		</p>
	<p>
		<b>
			<u>
				Not everything we project should be for the purpose of earning money or conforming to
				expectations.
			</u>
		</b>

		Sometimes we gasp at the world around us, sucking in polluted breaths. We must not forget to
		accasionally exhale the bad air. Some of this content is "bad" air.

		<br />
		<br />

		It occured to me that I'd rather share my thoughts than carry the weight of them.

		<br />
		
		With that said, don't take anything you read here too seriously. But it's fun to ponder.
	</p>
</section>

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

			{#each data[category] as post}
				<div class="post">
					<BlogItem markdownContent={post} />
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
