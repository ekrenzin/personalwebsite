<script lang="ts">
	import BlogItem from './BlogItem.svelte';
	import { onMount } from 'svelte';
	import '../../md.css';
	import CommentArea from '$lib/components/Comments/CommentArea.svelte';

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
		This is a deeply personal creative space, where I graple with emotion; Often depression,
		sometimes joy.
	</h2>
	<p>
		Much of the content on this page is either explicit, or not professional. I think that's ok.
		Indeed, much of this writing is from a younger man than I am today. The phenomenologist in me
		considers these writings to be a snapshot of my life at the time of writing. In other words, the
		person who wrote the words no longer exists, and "I" - the person currating this collection - am
		simply an auditor.

		<br />
		<br />

		<b>
			<u>
				Not everything we project should be for the purpose of earning money or conforming to
				expectations.
			</u>
		</b>

		Sometimes we gasp at the world around us, sucking in polluted breaths. We must not forget to
		accasionally exhale the bad air.

		<br />
		<br />

		It occured to me that I'd rather share my musings than carry the weight of them alone. That
		perhaps carrying my thoughts inside was the definition of being alone.

		<br />
		<br />

		I wrote many of these poems and musings in dark moments, but sharing them is a way for me to
		step in to the light. To an extent, I believe that's what art is; a way for us to share our
		experiences, and to connect with others. Perhaps, to me, this is also what life is.
	</p>
</section>
	<CommentArea source="writing"/>
<section>
	<nav class="category-nav">
		{#each categories as category}
			{#if data[category].length > 0}
				<a href="#{category}" class="category-button">{category.charAt(0).toUpperCase() + category.slice(1)}</a>
			{/if}
		{/each}
	</nav>			
</section>

{#each categories as category}
	{#if data[category].length > 0}
		<section id={category}>
			<h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
			<!-- Capitalize the first letter of the category -->
			{#each data[category] as post}
				<div class="post">
					<BlogItem markdownContent={post} />
				</div>
			{/each}
		</section>
	{/if}
{/each}

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
