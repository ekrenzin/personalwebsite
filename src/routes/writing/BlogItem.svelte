<script lang="ts">
	import { fade } from 'svelte/transition';
	import ImageCarousel from '$lib/components/ImageCarousel.svelte';
	import { cleanMDParsed } from '$lib/utils/markdown';
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { writingSettings } from './writingStore';
	export let markdownContent = {
		preview: '',
		title: '',
		url: '',
		imageSources: [],
		post_title: '',
		scripts: []
	};
	export let index: number;
	export let showImages = true;

	let article: HTMLElement;

	const hue = tweened(0, { duration: 100 });
	const saturation = tweened(100, { duration: 100 });
	const brightness = tweened(100, { duration: 100 });

	let intersecting = false;

	hue.subscribe((value) => {
		if (article) {
			article.style.filter = `hue-rotate(${value}deg) saturate(${$saturation}%) brightness(${$brightness}%)`;
		}
	});

	function setRandomColor() {
		if ($writingSettings.discoColors) {
			hue.set(Math.floor(Math.random() * 360));
			saturation.set(100 + Math.random() * 50); // range: 50% to 100%
			brightness.set(100 + Math.random() * 50); // range: 50% to 100%
		} else {
			hue.set(0);
			saturation.set(100);
			brightness.set(100);
		}
	}

	function onIntersect(node: HTMLElement, options = { threshold: 0.1 }) {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				node.style.opacity = '1';
				node.style.transform = 'none';
				intersecting = true;
			} else {
				node.style.opacity = '0';
				node.style.transform = 'scaleX(0.5)';
				intersecting = false;
			}
		}, options);

		observer.observe(node);
		return {
			destroy() {
				observer.unobserve(node);
			}
		};
	}

	function getID() {
		try {
			return markdownContent.url.split('/').pop();
		} catch {
			return '';
		}
	}

	function uuidv4() {
		return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
			(c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
		);
	}

	onMount(() => {
		//random filter hue that changes every second on the article
		setInterval(
			() => {
				setRandomColor();
			},
			Math.random() * 100 + 100
		);
	});
</script>

{#key markdownContent}
	{#if markdownContent && markdownContent.post_title}
		<article bind:this={article} use:onIntersect class="article-container" id={getID()}>
			<div class="content-container">
				<h3>{markdownContent.post_title.replace(/-/g, ' ')}</h3>
				<div class="preview-content">
					{@html cleanMDParsed(markdownContent.preview).htmlContent}
				</div>
				<a href={markdownContent.url}>
					<button
						id="read-more-{markdownContent.post_title.replace(/-/g, ' ')}"
						class="action-button"
					>
						Read More
					</button>
				</a>
			</div>
			{#if showImages}
				{#key intersecting}
					{#if markdownContent.imageSources.length > 0}
						<div in:fade class="image-preview-container">
							<ImageCarousel imageSources={markdownContent.imageSources} />
						</div>
					{/if}

					{#if markdownContent.scripts.length > 0}
						{#await uuidv4() then uid}
							<div class="canvas-container" id={`canvas-${index}-${markdownContent.title}`} />
							{#each markdownContent.scripts as script}
								<script src={script} id={`script-${index}-${markdownContent.title}`}></script>
							{/each}
						{/await}
					{/if}
				{/key}
			{/if}
			<slot />
		</article>
	{/if}
{/key}

<style>
	.canvas-container {
		width: 200px;
		height: 200px;
		margin: auto;
		overflow: hidden;
	}

	.article-container {
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		flex-wrap: wrap;
		align-items: stretch;
		border-radius: 15px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		overflow: hidden;
		padding: 2rem;
		transition:
			opacity 0.5s,
			transform 0.5s;
		opacity: 0;
		transform: scaleX(0.5);
		overflow: visible;
		width: 100%;
		transition: 0.25s;
	}

	.article-container:hover {
		background-color: black;
	}

	.content-container {
		flex: 1;
		padding: 8px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
	}

	.image-preview-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;
		width: 200px;
		height: 100%;
	}

	a {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	h3 {
		font-weight: 900;
	}

	:global(.preview-content p) {
		text-align: left !important;
	}

	:global(.preview-content h3) {
		text-align: left !important;
		font-size: 1rem;
		font-weight: 700;
	}
	@media (max-width: 600px) {
		.article-container {
			padding: 1rem;
			align-items: center;
			justify-content: center;
		}

		a {
			justify-content: center;
		}

		.image-preview-container {
			width: 100%;
			height: 300px;
		}
	}

	p {
		width: 100%;
	}
</style>
