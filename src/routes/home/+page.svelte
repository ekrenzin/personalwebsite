<script lang="ts">
	import TitleHeader from './TitleHeader.svelte';
	import VideoHero from './VideoHero.svelte';
	import Contact from '../contact/Contact.svelte';
</script>

<svelte:head>
    <!-- Primary Meta Tags -->
	<meta name="description" content="Ean Krenzin-Blank: Innovating in VR, Web, Mobile, and Desktop Development.">

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website">
	<meta property="og:url" content="https://eankrenzin.com/">
	<meta property="og:title" content="Ean Krenzin-Blank - Software Engineer">
	<meta property="og:description" content="Ean Krenzin-Blank: Innovating in VR, Web, Mobile, and Desktop Development.">
	<meta property="og:image" content="/me.jpeg">
	<meta property="og:site_name" content="Ean Krenzin-Blank">
	
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:url" content="https://eankrenzin.com/">
	<meta name="twitter:title" content="Ean Krenzin-Blank - Software Engineer">
	<meta name="twitter:description" content="Ean Krenzin-Blank: Innovating in VR, Web, Mobile, and Desktop Development.">
	<meta name="twitter:image" content="/me.jpeg">
	<meta name="twitter:site" content="@ekrenzin8">
	<meta name="twitter:creator" content="@ekrenzin8">
</svelte:head>
<div class="relative overflow-hidden container">
		<img
			class="image-blur tongue"
			src="/me_tongue.webp"
			alt="joke_image"
		/>

		<img
			class="image-blur grimace"
			src="/me_grimace.webp"
			alt="joke_image"
		/>
		<TitleHeader />
		<VideoHero />
		<!-- <FeaturedProjects /> -->
		<!-- Title -->
</div>
<!-- <Me /> -->
<!-- <Demo /> -->
<Contact />

<style>
	.container {
		width: 100%;
		max-width: 1000px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: auto;
		overflow: visible;
	}

	img {
		opacity: 1;
		filter: grayscale(1);
		position: absolute;
		opacity: 0.5;
		transition: 2s ease-in-out;
		/* z-index: 10; */
	}

	.tongue {
		top: 2rem;
		left: -15%;
	}

	.image-blur {
		position: absolute;
		width: 50%;
		height: 100%;
		object-fit: contain;
		-webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0));
		mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0));
	}

	.grimace {
		right: -15%;
		top: 25%;
		max-height: 500px;
		transform: rotate(20deg);
	}
</style>
