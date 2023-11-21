<script lang="ts">
    import {tooltip } from '$lib/utils/tooltip';
    import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { sendMessage, showChat } from './chatStore';
    import clipboard from '$lib/assets/icons/clipboard.svg';
    import analyze from '$lib/assets/icons/analyze.svg';
    import generate from '$lib/assets/icons/photo-plus.svg';

	let showAnalysisButton = writable(false);
	let buttonStyle = writable('');
	let selectedText = '';
    let moudeDown = false;

	onMount(() => {
        const body = document.querySelector('main');
        if (!body) return;
        body.addEventListener('mousedown', () => moudeDown = true);
        body.addEventListener('touchstart', () => moudeDown = true);
		body.addEventListener('mouseup', updateButtonPosition);
		body.addEventListener('touchend', () => updateButtonPosition);

		let selectionInterval = setInterval(checkSelection, 1000);

		return () => {
			body.removeEventListener('mouseup', updateButtonPosition);
			body.removeEventListener('touchend', () => updateButtonPosition);
			clearInterval(selectionInterval);
		};
	});

	function checkSelection() {
        if (!window || !window.getSelection) return;
		const text = window.getSelection().toString();
		if (text) {
			selectedText = text;
			showAnalysisButton.set(true);
		} else {
			showAnalysisButton.set(false);
		}
	}

	function updateButtonPosition(event) {
        moudeDown = false;
        checkSelection();
        setTimeout(checkSelection, 500);
		// const x = 0;
		// const y = event.clientY + window.scrollY;
		// const styleString = `top: ${y}px; left: ${x}px; position: absolute;`;
		// buttonStyle.set(styleString);
	}

	function analyzeText() {
        const html = document.body.innerHTML;
		$showChat = true;
		sendMessage(`Analyze my selected text: ${selectedText}`, window.location.pathname, html);
	}

	function generateImage() {
        const html = document.body.innerHTML;
		$showChat = true;
		sendMessage(`Generate image from my selected text: ${selectedText}`, window.location.pathname, html);
	}

    function copyToClipboard(event) {
        console.log("Copying text to clipboard...");
        const text = window.getSelection().toString();
        navigator.clipboard.writeText(text)
        .then(() => {
            console.log("Text copied to clipboard successfully!");
        })
        .catch(err => {
            console.error("Failed to copy text: ", err);
        });
    }
</script>


{#if $showAnalysisButton && !moudeDown}
	<div class="flex-column analyze-button" style={$buttonStyle}>
        <button
        use:tooltip title="Analyze selection with AI"
        on:click|stopPropagation={analyzeText}
        class="icon-button"
    >
        <img src = {analyze} alt="analyze text" />
    </button>
    <button
        use:tooltip title="Generate Image from selection with AI"
        on:click|stopPropagation={generateImage}
        class="icon-button"
    >
        <img src = {generate} alt="generate " />
    </button>
    <button
        use:tooltip title="Copy selection to clipboard"
        on:click|stopPropagation={copyToClipboard}
        class="icon-button"
    >
        <img src = {clipboard} alt="copy to clipboard" />
    </button>
	</div>
{/if}

<style>
	.analyze-button {
        position: fixed; /* Fixed positioning relative to the viewport */
        top: 50%; /* Center vertically */
        left: 1rem; /* Center horizontally */
        transform: translate(0%, -50%); /* Offset to ensure true centering */
        z-index: 30;
		gap: 1rem;
		background-color: rgba(0, 0, 0, 0.8);
		padding: 1rem;
		border-radius: 1rem;

	}

    img {
        filter: invert(1);
        width: 1.5rem;
    }
</style>
