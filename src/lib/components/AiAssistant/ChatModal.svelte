<script lang="ts">
    import ChatHistory from "./ChatHistory.svelte";
    import { messages } from "./chatStore";
    import { onMount, onDestroy } from 'svelte';

    export let toggleChatHistory: () => void;

    let message: string = "";
    let modalRef;

    async function sendMessage() {
        const sendMessage = message;
        if (!message) return;
        const systemMessage = { content: `We are currently at the path: ${window.location.href} on https://eankrenzin.com`, role: "system", id: new Date().getTime() + "system" };


        const newMessages = [...$messages, { content: sendMessage, role: "user", id: new Date().getTime() + "human" }];
        message = "";

        const timestamp = new Date().getTime() + "AI";
        //add a loading message, with id of timestamp
        $messages = [...newMessages, { content: "Loading...", role: "assistant", id: timestamp }];
        const response = await fetch('/api/cloudflareAI', {
			method: 'POST',
			body: JSON.stringify({ messages: [...newMessages, systemMessage] }),
			headers: {
				'content-type': 'application/json'
			}
		});

		const res = await response.json();
        const { output } = res;
        //replace the loading message with the response
        $messages = $messages.map((message) => {
            if (message.id === timestamp) {
                return { content: output, role: "assistant", id: timestamp };
            }
            return message;
        });
    }

    // Function to detect outside clicks and close the modal
    function handleClickOutside(event) {
        if (modalRef && !modalRef.contains(event.target)) {
            toggleChatHistory();
        }
    }

    onMount(() => {
        window.addEventListener('click', handleClickOutside);
    });

    onDestroy(() => {
        window.removeEventListener('click', handleClickOutside);
    });
</script>

<div class="wrapper flex-row">
    <div
        class="fixed inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center"
    >
        <div class="content relative p-5 bg-black rounded-lg shadow-xl max-h-screen  w-full m-4 overflow-y-auto">
            <div class="content-header">
            <h2>
                AI Assistant
            </h2>
        </div>
            <!-- Close Button -->
            <button
                class="absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-800"
                on:click={toggleChatHistory}
            >
                &#10005;
            </button>

            <div class="content-body">
            <!-- Chat History Component -->
            <div class="mb-4">
                <ChatHistory {toggleChatHistory} />
            </div></div>

            <div class="content-footer">
            <!-- Message Input and Send Button -->
            <div class="bottom-5 inset-x-0 mx-5">
                <textarea class="w-full text-gray-900 h-20 mt-2 p-2 rounded-lg shadow-lg" bind:value={message} />
                <button on:click={sendMessage} class="w-full bg-blue-500 text-white p-2 rounded-lg shadow-lg mt-2">
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
        max-height: 90vh;
        max-width: 90vw;
    }

    .content-body {
        height: 100%;
        width: 100%;
        overflow: auto;
    }

    .content-header {
        height: 80px;
    }

    .content-footer {
        height: 150px;
    }
</style>