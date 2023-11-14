<script>
    import { parse, Renderer } from 'marked';


    //dynamically import the markdown file based on the slug
	export let data;


    const renderer = new Renderer();

// Override how paragraphs are handled
renderer.paragraph = (text) => {
    // Split text by double line breaks to identify paragraphs
    return text.split(/\n\n+/).map(paragraph => {
        // Split each paragraph by single line break to identify lines
        return `<p>${paragraph.split(/\n/).map(line => `<span style="display: block">${line}</span>`).join('')}</p>`;
    }).join('');
};

// Override how blockquotes are handled
renderer.blockquote = (quote) => {
    // Wrap the blockquote in a <blockquote> tag and apply italic styling
    return `<blockquote>${quote}</blockquote>`;
};

    
// Use the custom renderer in the parse function
function loadHtml(c) {
    const htmlContent = parse(c.post, { renderer });
    return htmlContent;
}

</script>

<div class="container mx-auto page p-4 p-4 text-gray-300">
    <article class="prose lg:prose-xl">
        {@html loadHtml(data)}
    </article>
    <!-- centered button to go back -->
    <div class="flex-row">
    {#if data && data.previousPost && data.previousPost.url}
    <a class="previous" href={`/${data.previousPost.url}`} >← Previous</a>
    {/if}
    <a class="back" href={`/writing#${data.slug}`} >Back</a>
    {#if data && data.nextPost && data.nextPost.url}
    <a class="forward" href={`/${data.nextPost.url}`} >Next →</a>
    {/if}
</div>
</div>

<style>
    .page {
        position: relative;
        border-radius: 1rem;
        max-width: 1000px;
    }
    
article {
  font-family: 'Times New Roman', Times, serif;
}

.flex-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}

.flex-row a {
    text-decoration: underline;
}
</style>
