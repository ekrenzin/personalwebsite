<script>
	import { showChat, sendMessage } from '$lib/components/AiAssistant/chatStore';
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

	async function analyzeCategory() {
		$showChat = true;

		const postsData = posts.map((post) => {
			const title = post.post_title;
			const preview = post.preview;

			return title + preview;
		}).join('///////////////////');

		sendMessage(`Tell me about Ean's ${category}`, window.location.pathname, postsData);
	}

	onMount(() => {
		// interval = setInterval(next, 10000); // Change every 10 seconds
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<section id={category}>
	<h1 align='center' class="
	text-4xl
	tracking-tight
	font-extrabold
	sm:text-2xl
	text-gray-50
	md:text-3xl
	pb-4">{category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ')} ({posts.length} total)</h1>
	{#if viewAll}
		<div class="flex-col">
			{#each posts as post, index}
				<div class="post">
					<BlogItem markdownContent={post} {index}/>
				</div>
			{/each}
		</div>
	{:else}
		<div class="carousel">
			<div class="carousel-item">
				{#if posts.length > 0}
					<BlogItem markdownContent={posts[currentIndex]} index={-1}>
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

	<button
		class="mt-4 bg-black hover:bg-gray-900 text-white py-2 px-4 rounded"
		on:click={analyzeCategory}
	>
		Ask AI about the Category
	</button>
</section>

<style>
	h1 {
		text-transform: capitalize;
	}
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
