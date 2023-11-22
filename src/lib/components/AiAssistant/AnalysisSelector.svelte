<script lang="ts">
    import { fly, blur } from 'svelte/transition';
    import {tooltip } from '$lib/utils/tooltip';
    import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
    import { analyzeText, generateImage } from './AnalyzeAI';
    import clipboard from '$lib/assets/icons/clipboard.svg';
    import analyze from '$lib/assets/icons/analyze.svg';
    import generate from '$lib/assets/icons/photo-plus.svg';

	let showAnalysisButton = writable(false);
	let buttonStyle = writable('');
	let selectedText = '';
    let moudeDown = false;

    let storedSeletedText = "";


    onMount(() => {
        const updateSelection = () => {
            selectedText = window.getSelection().toString();
            console.log("Selected text: ", selectedText);
            if (!selectedText) {
                setTimeout(() =>{
                    storedSeletedText = "";
                    showAnalysisButton.set(false);
                }, 1000)
            } else {
                storedSeletedText = selectedText;
                showAnalysisButton.set(true);
            }
            // Consider dynamic button positioning here based on event and selection
        };

        document.addEventListener('mouseup', updateSelection);
        document.addEventListener('touchend', updateSelection);

        return () => {
            document.removeEventListener('mouseup', updateSelection);
            document.removeEventListener('touchend', updateSelection);
        };
    });

    function copyToClipboard(event) {
        console.log("Copying text to clipboard...");
        navigator.clipboard.writeText(storedSeletedText)
        .then(() => {
            console.log("Text copied to clipboard successfully!");
        })
        .catch(err => {
            console.error("Failed to copy text: ", err);
        });
    }
</script>


{#if $showAnalysisButton}
	<div in:blur out:fly class="flex-column analyze-button" style={$buttonStyle}>
        <button
        use:tooltip title="Analyze selection with AI"
        on:click|stopPropagation={() => analyzeText(storedSeletedText)}
        class="icon-button"
    >
        <img src = {analyze} alt="analyze text" />
    </button>
    <button
        use:tooltip title="Generate Image from selection with AI"
        on:click|stopPropagation={() => generateImage(storedSeletedText)}
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
    button {
        height: 1rem;
        width: 1rem;
    }
</style>
