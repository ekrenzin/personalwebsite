<script lang="ts">
	export let icon: string;
	export let href: string;
</script>

<div class="col-span-2 flex justify-center md:col-span-3 lg:col-span-1">
	<a {href} target="_blank" rel="noreferrer" class="social-button">
		<img class="h-6 w-6" src={icon} alt="Workcation" />
	</a>
</div>

<style>
	.social-button {
		opacity: 0.8;
	}

	.social-button:hover {
		opacity: 0.7;
	}
</style>
