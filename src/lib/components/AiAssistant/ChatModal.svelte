<script lang="ts">
	import ChatHistory from './ChatHistory.svelte';
	import { sendMessage } from './chatStore';

	export let toggleChatHistory: () => void;

	let message: string = '';
	let modalRef;

	async function createMessage() {
		const messageToSend = message;
		if (!message) return;
		message = '';
		sendMessage(messageToSend, window.location.pathname);
	}
</script>

<div class="wrapper flex-row">
	<div
		class="fixed inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center"
	>
		<div
			class="content relative p-5 bg-black rounded-lg shadow-xl max-h-screen w-full m-4 overflow-y-auto"
		>
			<div class="content-header">
				<h2>AI Assistant</h2>
			</div>
			<!-- Close Button -->
			<button
				class="absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-800"
				on:click={toggleChatHistory}
			>
				&#10005;
			</button>

			<div class="content-body bg-gray-900 p-4 mb-4">
					<ChatHistory  />
			</div>

			<div class="content-footer">
				<!-- Message Input and Send Button -->
				<div class="bottom-5 inset-x-0 mx-5">
					<textarea
						class="w-full text-gray-900 h-20 mt-2 p-2 rounded-lg shadow-lg"
						bind:value={message}
					/>
					<button
						on:click={createMessage}
						class="w-full bg-blue-500 text-white p-2 rounded-lg shadow-lg mt-2"
					>
						Send
					</button>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	
	.wrapper {
		z-index: 10000;
		position: fixed;
	}
	.content {
		display: flex;
		justify-content: flex-start;
		flex-direction: column;
		width: 1000px;
		height: 1000px;
		max-height: 90%;
		max-width: 90%;
	}

	.content-body {
		height: 100%;
		width: 100%;
		overflow: auto;
		border-radius: 0.5rem;
	}

	.content-header {
		height: 80px;
	}

	.content-footer {
		height: 150px;
	}
</style>
