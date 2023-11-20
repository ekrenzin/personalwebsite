<script lang="ts">
    import ImageCarousel from '$lib/components/ImageCarousel.svelte';
import { parse, Renderer } from 'marked';

    export let markdownContent = {
        preview: "",
        title: "",
        url: "",
        imageSources: []
    };

    function cleanMD(text: string) {
        const htmlContent = parse(text);
        return htmlContent;
    }

    function onIntersect(node: HTMLElement, options = { threshold: 0.1 }) {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                node.style.opacity = '1';
                node.style.transform = 'none';
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
    return text.split(/\n\n+/).map(paragraph => {
        // Split each paragraph by single line break to identify lines
        return `<p>${paragraph.split(/\n/).map(line => `<span style="display: block">${line}</span>`).join('')}</p>`;
    }).join('');
};
</script>
<article use:onIntersect class="frosted article-container" id={markdownContent.url.split('/').pop()}>
    <div class="content-container">
        <p>{@html cleanMD(markdownContent.preview)}</p>
        <a href={markdownContent.url}>
            <button class="mt-4 bg-blue-500 hover:bg-blue-900 text-white py-2 px-4 rounded">
                Read more
            </button>
        </a>
    </div>

    {#if markdownContent.imageSources.length > 0}
    <div class="image-preview-container">
        <ImageCarousel imageSources={markdownContent.imageSources} />
    </div>
    {/if}
</article>

<style>
    .article-container {
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
    }

    .content-container {
        flex: 1;
        padding: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
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
