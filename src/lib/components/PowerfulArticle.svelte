<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { sendMessage, showChat } from './AiAssistant/chatStore';

	export let html: string;

	let showAnalysisButton = writable(false);
	let buttonStyle = writable('');
	let selectedText = '';

	onMount(() => {
		const articleElement = document.querySelector('.article');

		articleElement.addEventListener('mouseup', updateButtonPosition);
		articleElement.addEventListener('touchend', () => updateButtonPosition);

		let selectionInterval = setInterval(checkSelection, 1000);

		return () => {
			articleElement.removeEventListener('mouseup', updateButtonPosition);
			articleElement.removeEventListener('touchend', () => updateButtonPosition);
			clearInterval(selectionInterval);
		};
	});

	function checkSelection() {
		const text = window.getSelection().toString();
		if (text) {
			selectedText = text;
			showAnalysisButton.set(true);
		} else {
			showAnalysisButton.set(false);
		}
	}

	function updateButtonPosition(event) {
		const x = 0;
		const y = event.clientY - 50 + window.scrollY;
		const styleString = `top: ${y}px; left: ${x}px; position: absolute;`;
		buttonStyle.set(styleString);

		checkSelection();
	}

	function analyzeText() {
		$showChat = true;
		sendMessage(`Analyze my selected text: ${selectedText}`, window.location.pathname, html);
	}
</script>

<article class="article">
	{@html html}
</article>

{#if $showAnalysisButton}
	<button
		on:click={analyzeText}
		class="analyze-button bg-blue-800 text-white p-4 rounded-full shadow-lg focus:outline-none hover:bg-blue-900"
		style={$buttonStyle}
	>
		Analyze Selection with AI
	</button>
{/if}

<style>
	.analyze-button {
		/* Basic styles for the button */
		position: absolute; /* Position absolute is required for dynamic positioning */
		z-index: 10; /* Ensure it's above other elements */
		/* Other styling as needed */
	}

	article {
		font-family: 'Times New Roman', Times, serif;
	}
</style>
