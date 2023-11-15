<script lang="ts">
	import ChatModal from './ChatModal.svelte';

	let showChatHistory = false;

	function toggleChatHistory() {
		showChatHistory = !showChatHistory;
	}

</script>

<div class="flex flex-col items-end">
	<button
		class="chat-bubble bg-blue-500 text-white p-4 rounded-full shadow-lg focus:outline-none hover:bg-blue-600 transition"
		on:click={toggleChatHistory}
	>
		Chat with my AI
	</button>

</div>

{#if showChatHistory}
<ChatModal {toggleChatHistory} />
{/if}
<style>
	.chat-bubble {
		z-index: 10000;
		/* Additional styling if needed */
		position: fixed;
		bottom: 1rem;
		right: 1rem;
	}
</style>
