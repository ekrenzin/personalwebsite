<script lang="ts">
	import '../app.css';
	import { browser } from '$app/environment';
	import NavBar from '$lib/components/NavBar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ChatBubble from '$lib/components/AiAssistant/ChatBubble.svelte';
	import AnalysisSelector from '$lib/components/AiAssistant/AnalysisSelector.svelte';
	import CommentArea from '$lib/components/Comments/CommentArea.svelte';
	import { page } from '$app/stores';
	import Toasts from '$lib/components/Toasts/ToastsHandler.svelte';
	import Avatar from '$lib/components/Avatar/Avatar.svelte';
	import { onMount } from 'svelte';

	let routeID = '';
	let url = '';
	let isReady = false;

	const avatar_urls = ['writing', 'demo'];

	onMount(() => {
		if (!browser) return;
		isReady = true;
	});

	page.subscribe((value) => {
		url = value.url.href || '';
		routeID = value.route.id || '';
	});

	function processAvatarUrls() {
		return true;
		let shouldShow = false;
		//if the url contains any of the avatar urls, return true
		for (let i = 0; i < avatar_urls.length; i++) {
			if (url.includes(avatar_urls[i])) {
				shouldShow = true;
				break;
			}
		}
		console.log('should show: ' + shouldShow);
		return shouldShow;
	}
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<meta
		name="description"
		content="Ean Krenzin-Blank: Specializing in VR, Web, Mobile, and Desktop Development."
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://eankrenzin.com/" />
	<meta
		property="og:description"
		content="Ean Krenzin-Blank: Innovating in VR, Web, Mobile, and Desktop Development."
	/>
	<meta property="og:image" content="/me.jpeg" />
	<meta property="og:site_name" content="Ean Krenzin-Blank" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://eankrenzin.com/" />
	<meta
		name="twitter:description"
		content="Ean Krenzin-Blank: Innovating in VR, Web, Mobile, and Desktop Development."
	/>
	<meta name="twitter:image" content="/me.jpeg" />
	<meta name="twitter:site" content="@ekrenzin8" />
	<meta name="twitter:creator" content="@ekrenzin8" />
</svelte:head>

<div>
	<!-- <NavBar /> -->
	{#if isReady}
		<main>
			<slot />
		</main>
		{#key routeID}
			{#if !url.includes('writing')}
				<CommentArea source={routeID} />
			{/if}
			{#if processAvatarUrls()}
				<Avatar />
			{/if}
		{/key}
		<AnalysisSelector />
		<ChatBubble />
		<Toasts />
	{/if}
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

	main {
		max-width: 100%;
		overflow: hidden;
	}
</style>
