<script>
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
	import { page } from '$app/stores';

	/** @type {import('./$types').PageData} */
	export let data;

	const defaultBackground =
		'linear-gradient( 0deg, rgba(154, 86, 151, 0.09), rgba(154, 86, 151, 0.09) ), linear-gradient( 214.47deg, rgba(29, 107, 130, 0.09) -13.09%, rgba(4, 134, 152, 0.18) -10.93%, rgba(0, 0, 0, 0) 14.47%, rgba(27, 201, 239, 0.135) 73.4% )';

	let mainBackground = defaultBackground;

	page.subscribe((value) => {
		if (!value) return;
		const _page = value.url.pathname;
		if (_page.includes('art')) {
			mainBackground = '#0C090D';
		} else {
			mainBackground = defaultBackground;
		}
	});



</script>

<main style={`background: ${mainBackground}`}>
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
		background: hsla(217, 100%, 50%, 1);

		background: linear-gradient(90deg, hsla(217, 100%, 50%, 1) 0%, hsla(197, 100%, 64%, 1) 100%);

		background: -moz-linear-gradient(
			90deg,
			hsla(217, 100%, 50%, 1) 0%,
			hsla(197, 100%, 64%, 1) 100%
		);
	}
</style>
