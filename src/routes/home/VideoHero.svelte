<script>
    import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
    let isVideoLoading = true; // State to track video loading
</script>

<div class="video-container">
    {#if isVideoLoading}
    <div class="loading-container">
        <LoadingSpinner size={200} color="white" />
    </div>
    {/if}

    <video
        class="video"
        src="https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/dashboard.mp4"
        autoplay
        loop
        muted
        playsinline
        on:play={() => isVideoLoading = false}
    ></video>
</div>

<style> 
 .video-container {
    position: relative;
    width: 90%; /* Adjusted to be more responsive */
    aspect-ratio: 16 / 9;
    margin: auto;
    padding-top: 56.25%;
    overflow: hidden; /* Hide overflow to maintain aspect ratio */
    background-color: black;
    border-radius: 0.5rem; /* Optional for rounded corners */
}

.video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; /* Ensures the video covers the container */
    border-radius: 0.5rem; /* Optional for rounded corners */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Optional for shadow effect */
}

.loading-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background-color: rgba(0, 0, 0, 0.5); */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 10;
}
</style>