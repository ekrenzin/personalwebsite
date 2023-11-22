<script lang="ts">
	import ImageCarousel from '$lib/components/ImageCarousel.svelte';
	import { cleanMD } from '$lib/utils/markdown';
	export let markdownContent = {
		preview: '',
		title: '',
		url: '',
		imageSources: [],
		post_title: '',
		scripts: []
	};
	export let index: number;

	let intersecting = false;

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
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}


</script>

{#key markdownContent}
{#if markdownContent}
	<article use:onIntersect class="article-container" id={getID()}>
		<div class="content-container">
			<p>{@html cleanMD(markdownContent.preview)}</p>
			<a href={markdownContent.url}>
				<button class="mt-4 bg-blue-500 hover:bg-blue-900 text-white py-2 px-4 rounded">
					Read {markdownContent.post_title}
				</button>
			</a>
		</div>

		{#if markdownContent.imageSources.length > 0}
			<div class="image-preview-container">
				<ImageCarousel imageSources={markdownContent.imageSources} />
			</div>
			
			{/if}
			{#key intersecting}
			
		{#if markdownContent.scripts.length > 0}
		{#await uuidv4() then uid}
			<div id={`canvas-${index}-${markdownContent.title}`} style="width: 50%" />
			{#each markdownContent.scripts as script}
				<script src={script} id={`script-${index}-${markdownContent.title}`} ></script>
			{/each}
		{/await}
		{/if}
		{/key}
		<slot />
	</article>
{/if}
{/key}

<style>
	#p5-canvas {
		border: 2px solid white;
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
		transition: opacity 0.5s, transform 0.5s;
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
	}

	@media (max-width: 600px) {
		.article-container {
			flex-direction: column;
			padding: 1rem;
		}

		.image-preview-container {
			width: 100%;
			height: auto;
		}
	}

	p {
		width: 100%;
	}
</style>
