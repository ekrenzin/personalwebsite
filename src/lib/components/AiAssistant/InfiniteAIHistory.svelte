<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
    import { loadHtml } from '$lib/utils/markdown';
	import { Render } from 'svelte-purify';

	type Message = {
		MessageId: number;
		IP: string;
		Prompt: string;
		Result: string;
		CreatedAt: string;
		UpdatedAt: string;
	};

	const messages = writable([]);
	let page = 1;
	const limit = 10; // Set the number of messages to load per page
	let loading = false;

	async function loadMessages() {
		if (loading) return;
		loading = true;

		try {
			const response = await getMessages(page, limit);
			if (response && response.length > 0) {
				messages.update((currentMessages) => [...currentMessages, ...response]);
				page += 1;
			}
		} catch (error) {
			console.error('Error loading messages:', error);
		}

		loading = false;
	}

	onMount(() => {

		// Add scroll event listener
		window.addEventListener('scroll', () => {
			if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
				loadMessages();
			}
		});
	});

	// getMessages function
	async function getMessages(page, limit) {
		const response = await fetch(`/api/cloudflareAI?page=${page}&limit=${limit}`, {
			method: 'GET'
		});
		const res = await response.json();
		const results: Message[] = res.results;


        return results;
	}
</script>

<!-- Component UI -->
<section>
	<h1>Scrolling list of AI Messages</h1>
    <div class="text-lg font-semibold mb-4">
        <p>This section displays a list of AI-generated messages. Each thread shows the original prompt and the AI's response, demonstrating the interaction between human input and AI output.</p>
    </div>
	{#await loadMessages()}
		Loading...
	{:then res} 
	{#each $messages as message}
    <div class="thread">
            <div class="message prompt">
                <h3>Human:</h3>
				<Render html={loadHtml(message.Prompt)} />
            </div>
            <div class="message result">
                <h3>AI:</h3>
				<Render html={loadHtml(message.Result)} />
            </div>
        </div>
	{/each}
	{/await}
</section>

<style>
    section {
        padding: 1rem;
        max-width: 1000px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin: auto;
        gap: 1rem;
    }
    .message {
        padding: 0.5rem;
        width: 100%;
    }

    :global(.message img) {
        max-height: 200px;
    }

    .thread {
        background-color: black;
        border-radius: 1rem;
        overflow: hidden;
        padding: 1rem;
    }

    .prompt {
        color: rgb(109, 152, 236)
    }

</style>
