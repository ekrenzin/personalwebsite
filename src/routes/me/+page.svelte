<script lang="ts">
    import MeOverview from "./MeOverview.svelte";
    import EmploymentHistory from "./EmploymentHistory.svelte";
    import Skills from "./Skills.svelte";
</script>

<svelte:head>
    <title>Me | eankrenzin.com</title>
	<meta name="description" content="Ean Krenzin-Blank: Innovating in VR, Web, Mobile, and Desktop Development.">

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website">
	<meta property="og:url" content="https://eankrenzin.com/">
	<meta property="og:title" content="Ean Krenzin-Blank - Software Engineer">
	<meta property="og:description" content="Ean Krenzin-Blank: Innovating in VR, Web, Mobile, and Desktop Development.">
	<meta property="og:image" content="/me.jpeg">
	<meta property="og:site_name" content="Ean Krenzin-Blank">
	
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:url" content="https://eankrenzin.com/">
	<meta name="twitter:title" content="Ean Krenzin-Blank - Software Engineer">
	<meta name="twitter:description" content="Ean Krenzin-Blank: Innovating in VR, Web, Mobile, and Desktop Development.">
	<meta name="twitter:image" content="/me.jpeg">
	<meta name="twitter:site" content="@ekrenzin8">
	<meta name="twitter:creator" content="@ekrenzin8">
</svelte:head>
<!-- create a tailwind css card with a dark backgorund -->
  <div class="rounded-2xl drop-shadow-lg my-10 mx-10">
    <MeOverview />
    <EmploymentHistory />
    <Skills />
</div>
