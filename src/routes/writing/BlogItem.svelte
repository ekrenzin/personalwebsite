<script lang="ts">
    import { parse, Renderer } from 'marked';

    export let markdownContent = {
        preview: "",
        title: "",
        url: ""
    };

    function cleanMD(text: string) {
        const htmlContent = parse(text);
        return htmlContent;
    }

    function onIntersect(node: HTMLElement, options = { threshold: 0.1 }) {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                console.log('intersecting')
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

<article use:onIntersect  class="bg-white rounded-lg shadow-lg overflow-hidden p-8 frosted">
    <p>{@html cleanMD(markdownContent.preview)}</p>
    <a href={markdownContent.url}>
        <button class="mt-4 bg-blue-500 hover:bg-blue-900 text-white py-2 px-4 rounded">
            Read more
        </button>
    </a>
</article>


  <style>
    article {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: 0.2s;
        opacity: 0;
        transform: scale(0.4);
        transition: 0.5s;
    }

    button {
        transition: 0.5s
    }
  </style>