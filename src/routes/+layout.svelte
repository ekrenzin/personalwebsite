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
		width: 100%;
		height: 100%;
		min-width: 100vw;
		min-height: 100vh;
		overflow: auto;
	}
</style>
