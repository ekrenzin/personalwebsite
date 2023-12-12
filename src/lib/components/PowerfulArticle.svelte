<script lang="ts">
	export let html: string;
</script>

<article class="article">
	{@html html}
	<slot />
</article>

<style>
	article {
		font-family: 'Times New Roman', Times, serif;
	}

	:global(.article img) {
		max-width: 400px;
	}
</style>
