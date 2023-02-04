<script>
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
	import ComputerScene from '$lib/components/scene/Scene.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	import { onMount } from 'svelte';
</script>

<main>
	<NavBar />
	<slot />
</main>

<style>
	main {
		height: 100%;
		width: 100%;
		min-width: 100vw;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		overflow: auto;
		background: hsla(217, 100%, 50%, 1);

		background: linear-gradient(90deg, hsla(217, 100%, 50%, 1) 0%, hsla(197, 100%, 64%, 1) 100%);

		background: -moz-linear-gradient(
			90deg,
			hsla(217, 100%, 50%, 1) 0%,
			hsla(197, 100%, 64%, 1) 100%
		);
	}
</style>
