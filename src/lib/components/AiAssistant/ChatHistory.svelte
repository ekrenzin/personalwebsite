<script lang="ts">
	import { onMount } from 'svelte';
	import ChatConversation from './ChatConversation.svelte';
	import { messages } from './chatStore';

	let chatContainer: HTMLElement;

	// Automatically scroll to the bottom when the component mounts and when messages update
	onMount(() => {
		scrollToBottom();
	});


	function scrollToBottom() {
		if (!chatContainer) return;
		chatContainer.scrollTop = chatContainer.scrollHeight;
	}

	
	$: $messages, scrollToBottom();
</script>

<div bind:this={chatContainer} class="chat-container">
	{#each $messages as message}
		<ChatConversation message={message.content} sender={message.role} />
	{/each}
</div>

<style>
	.chat-container {
		overflow-y: auto;
		max-height: 100%; /* Adjust as needed */
	}
</style>
