<script>
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<main>
	{#if data.noise}
		<div class="noise" />
	{/if}
	<div class="gradient" />
	<NavBar />
	{#if data.message}
		<div
			id="banner"
			tabindex="-1"
			class="flex fixed z-50 gap-8 justify-between items-start py-3 px-4 w-full bg-gray-50 border border-b border-gray-200 sm:items-center dark:border-gray-700 lg:py-4 dark:bg-gray-800"
		>
			<p class="text-sm font-light text-gray-500 dark:text-gray-400">
				Supercharge your hiring by taking advantage of our <a
					class="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline"
					href="#">limited-time sale</a
				> for Designer Search + Job Board. Unlimited access to over 190K top-ranked candidates and the
				#1 design job board.
			</p>
			<button
				data-collapse-toggle="banner"
				type="button"
				class="flex items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
			>
				<svg
					class="w-5 h-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/></svg
				>
			</button>
		</div>
	{/if}
	<slot  />
</main>

<style>
	.noise {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 10;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: url('$lib/assets/noise.png');
		object-fit: cover;
		opacity: 0.5;
		user-select: none;
		pointer-events: none;
	}

	.gradient {
		background: linear-gradient(-45deg, #41729f 0%, #274472 18%, #5885af 79%, #c3e0e5 100%);
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		user-select: none;
		pointer-events: none;
		opacity: 1;
	}
</style>
