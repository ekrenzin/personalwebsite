<script>
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ChatBubble from '$lib/components/AiAssistant/ChatBubble.svelte';
</script>

<svelte:head>
	<title>{'Ean Krenzin-Blank'}</title>
</svelte:head>

<div>
	<NavBar />
	<main>
		<slot />
	</main>
	<ChatBubble />
	<Footer />
</div>

<style>
	div {
		position: relative;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		overflow: auto;
	}
</style>
