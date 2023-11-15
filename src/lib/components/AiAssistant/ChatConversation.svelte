<script lang="ts">
    import { marked } from "marked";
    import { loadHtml } from '$lib/utils/markdown';
    export let message: string;
    export let sender: string;
    

    function parseMarkdown(markdown: string) {
        try {
            return marked(markdown);
        } catch (e) {
            return markdown;
        }
    }
</script>

{#if sender === "assistant" || sender === "user"}
<div class={`p-2.5 text-sm w-70 mx-2 my-1 rounded-lg shadow ${sender === 'user' ? 'ml-auto' : 'mr-auto'} ${sender === 'user' ? 'bg-blue-200 text-blue-800' : 'bg-green-200 text-green-800'}`}>
    {@html loadHtml(message)}
</div>
{/if}


<style>
	.page {
		position: relative;
		border-radius: 1rem;
		max-width: 1000px;
	}
    
    div {
        max-width: 80%;
    }

</style>