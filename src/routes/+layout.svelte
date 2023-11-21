<script>
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ChatBubble from '$lib/components/AiAssistant/ChatBubble.svelte';
	import AnalysisSelector from '$lib/components/AiAssistant/AnalysisSelector.svelte';
</script>

<svelte:head>
    <!-- Primary Meta Tags -->
    <meta name="description" content="Ean Krenzin-Blank: Specializing in VR, Web, Mobile, and Desktop Development.">

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website">
	<meta property="og:url" content="https://eankrenzin.com/">
	<meta property="og:description" content="Ean Krenzin-Blank: Innovating in VR, Web, Mobile, and Desktop Development.">
	<meta property="og:image" content="/me.jpeg">
	<meta property="og:site_name" content="Ean Krenzin-Blank">
	
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:url" content="https://eankrenzin.com/">
	<meta name="twitter:description" content="Ean Krenzin-Blank: Innovating in VR, Web, Mobile, and Desktop Development.">
	<meta name="twitter:image" content="/me.jpeg">
	<meta name="twitter:site" content="@ekrenzin8">
	<meta name="twitter:creator" content="@ekrenzin8">
</svelte:head>

<div>
	<NavBar />
	<main>
		<slot />
	</main>
	<Footer />
</div>
<AnalysisSelector />
<ChatBubble />

<style>
	div {
		position: relative;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		overflow: auto;
	}

	main {
		max-width: 100%;
		overflow: hidden;
	}
</style>
