<script lang="ts">
	import TitleHeader from './TitleHeader.svelte';
	import VideoHero from './VideoHero.svelte';
	import Contact from '../contact/Contact.svelte';
</script>

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
