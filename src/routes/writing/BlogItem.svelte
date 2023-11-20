<script lang="ts">
	import ImageCarousel from '$lib/components/ImageCarousel.svelte';
	import { parse, Renderer } from 'marked';

	export let markdownContent = {
		preview: '',
		title: '',
		url: '',
		imageSources: [],
		post_title: ''
	};

	function cleanMD(text: string) {
		let htmlContent = parse(text);

		// Use regex to remove <div align="center"> and corresponding closing </div>
		htmlContent = htmlContent.replace(/<div align="center">[\s\S]*?/g, '');
		return htmlContent;
	}

	function onIntersect(node: HTMLElement, options = { threshold: 0.1 }) {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				node.style.opacity = '1';
				node.style.transform = 'none';
			} else {
                node.style.opacity = '0';
                node.style.transform = 'scale(0.4)';
            }
		}, options);

		observer.observe(node);
		return {
			destroy() {
				observer.unobserve(node);
			}
		};
	}

	const renderer = new Renderer();

	// Override how paragraphs are handled
	renderer.paragraph = (text) => {
		// Split text by double line breaks to identify paragraphs
		return text
			.split(/\n\n+/)
			.map((paragraph) => {
				// Split each paragraph by single line break to identify lines
				return `<p>${paragraph
					.split(/\n/)
					.map((line) => `<span style="display: block">${line}</span>`)
					.join('')}</p>`;
			})
			.join('');
	};
</script>

<article use:onIntersect class="article-container" id={markdownContent.url.split('/').pop()}>
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
	<slot />
</article>

<style>
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
		transform: scale(0.4);
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
