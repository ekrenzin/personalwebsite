<script>
	import ImageGrid from './ImageGrid.svelte';
	import ArtScene from './artScene.svelte';

	let files = [
		{
			source: 'https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/art/World_Design.jpg'
		},
		{
			source: 'https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/art/climb.jpeg'
		},
		{
			source: 'https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/art/flect.jpeg'
		},
		{
			source: 'https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/art/framedFace.jpeg'
		},
		{
			source: 'https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/art/head.jpg'
		},
		{
			source: 'https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/art/queen.jpg'
		},
		{
			source:
				'https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/art/darkForrestFace_.jpg'
		},
		{
			source: 'https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/art/turtle.jpeg'
		},
		{
			source: 'https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/art/oceanBrella.jpeg'
		},
		{
			source:
				'https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/art/balloons_noFrame.jpeg'
		},
		{
			source:
				'https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/art/california_noFrame.jpeg'
		},
		{
			source:
				'https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/art/cheeta_noFrame.jpeg'
		},
		{
			source:
				'https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/art/doesnothavemeaning_.jpeg'
		},
		{
			source: 'https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/art/foggyRive.jpeg'
		},
		{
			source: 'https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/art/rainMan.png'
		},
		{
			source:
				'https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/art/forrestFace_noface.jpeg'
		},
		{
			source:
				'https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/art/silverStars_ean.jpeg'
		},
		{
			source:
				'https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/art/skyIsland_noFrame.jpeg'
		}
	];

	let showGallery = true;
</script>

<svelte:head>
	<title>Art | eankrenzin.com</title>
	<meta name="description" content="Ean Krenzin-Blank's Art" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website">
	<meta property="og:url" content="https://eankrenzin.com/">
	<meta property="og:title" content="Ean Krenzin-Blank's Art">
	<meta property="og:description" content="Ean Krenzin-Blank's Art">
	<meta property="og:image" content="https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/art/head.jpg">
	<meta property="og:site_name" content="Ean Krenzin-Blank">
	
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:url" content="https://eankrenzin.com/">
	<meta name="twitter:title" content="Ean Krenzin-Blank's Art">
	<meta name="twitter:description" content="Ean Krenzin-Blank's Art">
	<meta name="twitter:image" content="https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/art/head.jpg">
	<meta name="twitter:site" content="@ekrenzin8">
	<meta name="twitter:creator" content="@ekrenzin8">
</svelte:head>

{#if showGallery}
	<ImageGrid bind:files />
{/if}

