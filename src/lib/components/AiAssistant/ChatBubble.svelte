<script lang="ts">
	import ChatModal from './ChatModal.svelte';
	import { showChat } from './chatStore';
	import { onMount } from 'svelte';
	import ChatIcon from '$lib/assets/icons/chat.svg';

	function toggleChatHistory() {
		showChat.update((value) => !value);
	}

	onMount(() => {
		showChat.subscribe((value) => {
			if (!document) return;
			if (value) {
				document.body.style.overflow = 'hidden';
			} else {
				document.body.style.overflow = 'auto';
			}
		});
	});
</script>

<div class="flex flex-col items-end">
	<button
		class="fab"
		on:click={toggleChatHistory}
	>
	<img class='icon-button' src={ChatIcon} alt="Chat" />
	</button>
</div>

{#if $showChat}
	<ChatModal {toggleChatHistory} />
{/if}

