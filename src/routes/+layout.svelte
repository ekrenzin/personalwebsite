<script>
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
</script>

<main >
	<NavBar />
	<slot />
</main>

<style>
	main {
		position: relative;
		height: 100%;
		width: 100%;
		min-width: 100vw;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		overflow: auto;

	}
</style>
