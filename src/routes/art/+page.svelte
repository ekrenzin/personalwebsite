<script>
    import ImageGrid from "$lib/components/art/ImageGrid.svelte";
	import ArtBg from '$lib/components/art/ArtBG.svelte';
    import ArtScene from "$lib/components/art/artScene.svelte";
    let files = [
      {
        source:
          "https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/art/World_Design.jpg",
      },
      {
        source:
          "https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/art/climb.jpeg",
      },
      {
        source:
          "https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/art/flect.jpeg",
      },
      {
        source:
          "https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/art/framedFace.jpeg",
      },
      {
        source:
          "https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/art/head.jpg",
      },
      {
        source:
          "https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/art/queen.jpg",
      },
      {
        source:
          "https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/art/darkForrestFace_.jpg",
      },
      {
        source:
          "https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/art/turtle.jpeg",
      },
      {
        source:
          "https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/art/oceanBrella.jpeg",
      },
      {
        source:
          "https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/art/balloons_noFrame.jpeg",
      },
      {
        source:
          "https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/art/california_noFrame.jpeg",
      },
      {
        source:
          "https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/art/cheeta_noFrame.jpeg",
      },
      {
        source:
          "https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/art/doesnothavemeaning_.jpeg",
      },
      {
        source:
          "https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/art/foggyRive.jpeg",
      },
      {
        source:
          "https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/art/rainMan.png",
      },
      {
        source:
          "https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/art/forrestFace_noface.jpeg",
      },
      {
        source:
          "https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/art/silverStars_ean.jpeg",
      },
      {
        source:
          "https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/art/skyIsland_noFrame.jpeg",
      },
    ];

    let showGallery = false;
</script>
<div style="position: relative; ">
  <button
    on:click={() => (showGallery = !showGallery)}
    class="bg-gray-900 text-white font-bold py-2 px-4 rounded"
    style="position: absolute; top: 0; right: 0; z-index: 1; "
    >{showGallery ? "Hide" : "Show"} Gallery</button>
  {#if showGallery}
  <ImageGrid bind:files />
  {/if}
<ArtScene bind:files />
<ArtBg />
</div>