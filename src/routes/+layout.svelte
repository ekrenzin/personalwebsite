<script lang="ts">
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ChatBubble from '$lib/components/AiAssistant/ChatBubble.svelte';
	import AnalysisSelector from '$lib/components/AiAssistant/AnalysisSelector.svelte';
	import CommentArea from '$lib/components/Comments/CommentArea.svelte';
	import { page } from '$app/stores';
	import Toasts from '$lib/components/Toasts/ToastsHandler.svelte';
	import Avatar from '$lib/components/Avatar/Avatar.svelte';
	import { browser } from '$app/environment';

	let routeID = "";
	let url = "";
	const avatar_urls = ["writing", "demo"];
	page.subscribe((value) => {
		url = value.url.href || "";
		routeID = value.route.id || "";
	});

	function processAvatarUrls(){
		return true;
		let shouldShow = false;
		//if the url contains any of the avatar urls, return true
		for(let i = 0; i < avatar_urls.length; i++){
			if(url.includes(avatar_urls[i])){
				shouldShow = true;
				break;
			}
		}
		console.log("should show: " + shouldShow);
		return shouldShow;
	}
</script>


<div>
	<NavBar />
	<main>
		<slot />
	</main>
	{#key routeID}
	{#if !url.includes("writing")}
		<CommentArea source={routeID} />
	{/if}
	{#if processAvatarUrls()}
		<Avatar />
	{/if}
	{/key}
	<Footer />
</div>
<AnalysisSelector />
<ChatBubble />
<Toasts />
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
