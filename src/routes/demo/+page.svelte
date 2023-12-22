<script>
	import ComputerScene from '$lib/components/scene/Scene.svelte';
	import DvDemo from '$lib/components/scene/DVDemo.svelte';
</script>


<svelte:head>
    <!-- Primary Meta Tags -->
    <title>Demo | eankrenzin.com</title>
	<meta name="description" content="Ean Krenzin-Blank - Demo Page of Desktop Vision">

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website">
	<meta property="og:url" content="https://eankrenzin.com/">
	<meta property="og:title" content="Demo of Desktop Vision - Ean Krenzin-Blank">
	<meta property="og:description" content="Demo of Desktop Vision - Ean Krenzin-Blank">
	<meta property="og:image" content="/me.jpeg">
	<meta property="og:site_name" content="Ean Krenzin-Blank">
	
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:url" content="https://eankrenzin.com/">
	<meta name="twitter:title" content="Demo of Desktop Vision - Ean Krenzin-Blank">
	<meta name="twitter:description" content="Ean Krenzin-Blank - Demo Page of Desktop Vision">
	<meta name="twitter:image" content="/me.jpeg">
	<meta name="twitter:site" content="@ekrenzin8">
	<meta name="twitter:creator" content="@ekrenzin8">
</svelte:head>

<div class="relative mx-auto">
	<div class="text-center py-10" />
	<!-- Title and Content Section for Contact Page -->
	<section class="text-center py-10">
		<DvDemo />
	</section>
</div>
