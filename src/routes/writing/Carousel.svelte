<script>
    import { fly } from 'svelte/transition';
	import BlogItem from './BlogItem.svelte';
	import { onMount, onDestroy } from 'svelte';

	export let category = '';
	export let posts = [];

	let currentIndex = 0;
	let interval;

	let viewAll = false;

	function next() {
		currentIndex = (currentIndex + 1) % posts.length;
	}

	function prev() {
		currentIndex = (currentIndex - 1 + posts.length) % posts.length;
	}

	onMount(() => {
		// interval = setInterval(next, 10000); // Change every 10 seconds
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<section id={category}>
	<h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
	{#if viewAll}
		<div class="flex-col">
			{#each posts as post}
				<div class="post">
					<BlogItem markdownContent={post} />
				</div>
			{/each}
		</div>
	{:else}
		<div class="carousel">
			<div class="carousel-item">
				{#if posts.length > 0}
					<BlogItem markdownContent={posts[currentIndex]}>
						<div>
							<button class="nav-button left" name="previous-post" on:click={prev}>
								<!-- Left Arrow SVG -->
								<svg
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path d="M15 18l-6-6 6-6" />
								</svg>
							</button>
							<button class="nav-button right" name="next-post" on:click={next}>
								<!-- Right Arrow SVG -->
								<svg
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path d="M9 18l6-6-6-6" />
								</svg>
							</button>
						</div>
					</BlogItem>
				{/if}
			</div>
		</div>
	{/if}

	<button
		class="mt-4 bg-black hover:bg-gray-900 text-white py-2 px-4 rounded"
		on:click={() => (viewAll = !viewAll)}
	>
		{#if viewAll}
			View Slider
		{:else}
			View all
		{/if}
	</button>
</section>

<style>
	section {
		width: 100%;
	}
	.flex-col {
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.carousel {
		width: 100%;
		position: relative;
		display: flex;
		align-items: center;
	}
	.carousel-item {
		flex: 1;
		display: flex;
		justify-content: center;
	}
	.nav-button {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		border: none;
		cursor: pointer;
		z-index: 10;
		border-radius: 50%;
		padding: 0.5rem;
	}
	.nav-button.left {
		left: -3rem;
	}
	.nav-button.right {
		right: -3rem;
	}
	.nav-button svg {
		width: 2rem; /* Adjust size as needed */
		height: 2rem;
	}
</style>
