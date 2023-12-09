<script lang="ts">
    export let imageSources: string[] = [];

    let currentIndex = 0;

    function nextImage() {
        currentIndex = (currentIndex + 1) % imageSources.length;
    }

    function previousImage() {
        currentIndex = (currentIndex - 1 + imageSources.length) % imageSources.length;
    }

    $: if (imageSources) currentIndex = 0;
</script>

<div class="carousel-container">
    {#if imageSources.length > 0}
        <img src={imageSources[currentIndex]} alt="Image Carousel" class="carousel-image" />
        {#if imageSources.length > 1}
            <button on:click={previousImage} class="carousel-button left">‹</button>
            <button on:click={nextImage} class="carousel-button right">›</button>
        {/if}
    {/if}
</div>

<style>
    .carousel-container {
        position: relative;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .carousel-image {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 10px;
    }

    .carousel-button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-color: rgba(0,0,0,0.5);
        color: white;
        border: none;
        cursor: pointer;
        padding: 10px;
        z-index: 10;
    }

    .left {
        left: 10px;
    }

    .right {
        right: 10px;
    }
</style>
