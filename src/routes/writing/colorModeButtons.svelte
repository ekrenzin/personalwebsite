<script>
    import { updateWritingStore, writingSettings } from './writingStore';

    const lightModes = [
        { key: 'bright', name: 'Bright' },
        { key: 'disco', name: 'Disco' },
        { key: 'nightMode', name: 'Night Mode' },
        { key: 'focusMode', name: 'Focus' }
    ];

    function toggleLightMode(mode) {
        updateWritingStore({
            lightsMode: $writingSettings.lightsMode === mode ? 'off' : mode
        });
    }

    function buttonLabel(mode) {
        return `${mode.name} ${$writingSettings.lightsMode === mode.key ? 'off' : 'on'}`;
    }
</script>

<div class="flex-column">
    {#each lightModes as mode}
        <button
            id="{mode.key}-button"
            class="m-auto bottom-0 m-4 bg-white hover:bg-pink-600 text-black py-2 px-4 rounded"
            on:click={() => toggleLightMode(mode.key)}>
            {buttonLabel(mode)}
        </button>
    {/each}
</div>

<style>
    .flex-column {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
</style>
