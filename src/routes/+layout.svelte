<script>
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
	import ComputerScene from '$lib/components/scene/Scene.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<main>
	{#if data.noise}
		<div class="noise" />
	{/if}
	<NavBar />
	<div class="gradient h-full w-full" />
	<div class="relative">
		<slot />
	</div>
</main>

<style>
	main {
		top: 0;
		left: 0;
		padding-bottom: 20px;
	}
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
		z-index: -1;
		position: fixed;
		top: 0;
		left: 0;
	}
</style>
