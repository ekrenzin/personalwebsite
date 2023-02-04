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
	<div class="gradient h-full w-full" />
	<slot />
</main>

<style>
	main {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		overflow: auto;
	}

	.gradient {
		background: hsla(217, 100%, 50%, 1);

		background: linear-gradient(90deg, hsla(217, 100%, 50%, 1) 0%, hsla(197, 100%, 64%, 1) 100%);

		background: -moz-linear-gradient(
			90deg,
			hsla(217, 100%, 50%, 1) 0%,
			hsla(197, 100%, 64%, 1) 100%
		);

		background: -webkit-linear-gradient(
			90deg,
			hsla(217, 100%, 50%, 1) 0%,
			hsla(197, 100%, 64%, 1) 100%
		);

		z-index: -1;
		position: fixed;
		top: 0;
		left: 0;
	}
</style>
