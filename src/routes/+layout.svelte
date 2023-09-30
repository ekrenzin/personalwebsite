<script>
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>{'Ean Krenzin-Blank'}</title>
</svelte:head>

<div>
	<NavBar />
	<main>
		<slot />
	</main>
	<Footer />
</div>

<style>
	div {
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
