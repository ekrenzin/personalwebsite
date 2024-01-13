<script lang="ts">
	import ChatHistory from './ChatHistory.svelte';
	import { sendMessage, readOutLoud, welcomeRead } from './chatStore';
	import { onMount } from 'svelte';
	import SendIcon from "$lib/assets/icons/send.svg";

	export let toggleChatHistory: () => void;

	const audio = new Audio('/ai_audio.mp3');

	let message: string = '';
	let reading = false;

	async function createMessage() {
		try {
		const messageToSend = message;
		if (!message) return;
		message = '';
		sendMessage(messageToSend, window.location.pathname);
    } catch (error) {
        console.log(error);
    }
	}

	async function toggleAudio() {
		if ($readOutLoud) {
			readOutLoud.set(false);
		} else {
			readOutLoud.set(true);
		}
		//set the local storage item to be the readOutLoud value
		localStorage.setItem('readOutLoud', JSON.stringify($readOutLoud));
	}

	readOutLoud.subscribe((value) => {
		reading = value;
	});

	onMount(() => {
		welcomeAudio();
	});

	function welcomeAudio() {
		if (!$readOutLoud) return;
		if ($welcomeRead) return;
		//if there is a local store set to true, bail
		if (localStorage.getItem('welcomeRead') === 'true') return;

		//store the welcomeRead value in local storage
		localStorage.setItem('welcomeRead', 'true');

		welcomeRead.set(true);
		audio.play();
	}

	readOutLoud.subscribe((value) => {
		if (!value) {
			audio.pause();
		}
	});

    function handleWrapperClick() {
        toggleChatHistory();
    }

    function handleContentClick(event: MouseEvent) {
        event.stopPropagation();
    }
</script>

<div class="wrapper flex-row" on:pointerdown={handleWrapperClick}>
    <div
        class="fixed inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center"
    >
        <div
            class="content relative p-5 bg-black rounded-lg shadow-xl max-h-screen w-full m-4 overflow-y-auto"
            on:pointerdown={handleContentClick}
        >
			<!-- Close Button -->
			<button
				class="absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-800"
				on:click={toggleChatHistory}
			>
				&#10005;
			</button>

			<div class="content-body mb-4">
					<ChatHistory  />
			</div>

			<div class="content-footer">
				<!-- Message Input and Send Button -->
				<div class="inset-x-0 mx- ">
					<textarea
						class="w-full bg-gray-100 text-gray-800 p-2 rounded-lg shadow-lg"
						bind:value={message}
					/>
					<button
						on:click={createMessage}
						class="send-icon"
					>
						<img src={SendIcon} alt="send"/>
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
		max-height: 95%;
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
		justify-content: space-between;
		align-items: center;

	}

	.content-footer {
		position: relative;
		padding-right: 3rem;
	}

	.send-icon {
		filter: invert(100%);
		position: absolute;
		right: 0rem;
		/* align vertically centered */
		top: 50%;
		transform: translateY(-50%);
		width: 2rem;
		height: 2rem;
	}

	
</style>
