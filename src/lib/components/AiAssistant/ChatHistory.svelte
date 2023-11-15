<script lang="ts">
	import ChatConversation from './ChatConversation.svelte';
    import { messages } from './chatStore';

</script>


			{#each $messages as message}
				<ChatConversation message={message.content} sender={message.role} />
			{/each}

<style>
    .flex-row {
        width: 500px;
        min-width: 500px;
    }
</style>