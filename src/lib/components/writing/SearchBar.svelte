<script lang="ts">
	import searchIcon from '$lib/assets/icons/search.svg';
	import BlogItem from '../../../routes/writing/BlogItem.svelte';

	let search: HTMLInputElement;
	let results: Array<searchResult> = [];

	interface searchResult {
		post_title: string;
		title: string;
		preview: string;
		url: string;
		imageSources: Array<string>;
		scripts: Array<string>;
		image: string;
		content: string;
	}

	async function handleSearch() {
		const response = await fetch(`/api/writing/?search=${search.value}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});
		const data = await response.json();
		results = data;
	}
</script>

<h4>Search for any term, and if it is within a post it will appear:</h4>
<form class="search-bar my-4" on:submit={handleSearch}>
	<input type="text" placeholder="Search" bind:this={search} />
	<button type="submit">
		<img src={searchIcon} alt="search" />
	</button>
</form>

{#if results.length > 0}
<section class="mt-4 mb-4">
	{#each results as result}
		<BlogItem markdownContent={result} showImages={true} />
	{/each}
</section>
{/if}

<style>
    h4 {
        text-align: center;
        font-size: larger;
        font-weight: 600;
        margin-bottom: 0.5rem;
    }
	section {
		width: 1000px;
		max-width: 90%;
		margin: auto;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-height: 500px;
		overflow: auto;
        padding: 2rem;
        border-radius: 0.5rem;
        background-color: var(--bg-color);
        margin-top: 2rem;
        margin-bottom: 4rem;
	}

	.search-bar {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 400px;
		max-width: 90%;
		margin: auto;
		height: 100%;
		gap: 1rem;
		background-color: rgba(255, 255, 255, 0.9);
		padding: 0.5rem;
		border-radius: 5rem;
	}
	input {
		width: 100%;
		height: 2rem;
		border: none;
		border-radius: 0.5rem;
		background-color: transparent;
		padding: 0.5rem;
		font-size: 1rem;
		outline: none;
		color: black;
	}

	img {
		height: 2rem;
	}
</style>
