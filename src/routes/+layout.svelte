<script>
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<main class="pt-16 h-screen">
	{#if data.noise}
		<div class="noise" />
	{/if}
	<div class="gradient" />
	<NavBar />
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
