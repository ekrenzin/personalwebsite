<script lang="ts">
	import { page } from '$app/stores';
	import { postComment } from '$lib/components/Comments/Comments';
	import { loadHtml } from '$lib/utils/markdown';
	import LoadingSpinner from '../LoadingSpinner.svelte';
	export let message: string;
	export let sender: string;
	const ignoredMessages: string[] = [
		'Hello, how can I assist you? You can try asking about this page.',
		'Loading...',
		'Please wait for a moment while I think...'
	];
	async function comment() {
		const slug = $page.params.slug || 'AI_Chats';
		await postComment({ source: slug, comment: message, user: 'AI Assistant' });
	}
</script>

{#if sender === 'assistant' || sender === 'user'}
	<div
		class={`p-2.5 text-sm w-70 mx-2 my-1 rounded-lg shadow ${
			sender === 'user' ? 'ml-auto' : 'mr-auto'
		} ${sender === 'user' ? 'bg-blue-200 text-blue-800' : 'bg-green-200 text-green-800'}`}
	>
		{#if message === 'Loading...'}
			<div class="flex-column">
				<p>Please wait for a moment while I think...</p>
				<LoadingSpinner size={40} />
			</div>
		{:else}
			{@html loadHtml(message)}
		{/if}
		{#if sender === 'assistant' && $page.params && $page.params.slug && !ignoredMessages.includes(message)}
			<button class="focus:outline-none bg-black p-2 rounded-full text-white" on:click={comment}
				>Comment this response</button
			>
		{/if}
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

	.flex-row {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		height: 100%;
		width: 100%;
	}
</style>
