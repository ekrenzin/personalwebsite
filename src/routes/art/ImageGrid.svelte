<script>
	export let files = [];

	function showImage(src) {
		this.showModal = true;
		this.imageSrc = src;
	}
</script>


<!-- Grid layout for images -->
<ul class="p-4 grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
	{#each files as file}
	  <li class="relative">
		<div class="group block aspect-w-10 aspect-h-7  bg-gray-100 overflow-hidden">
		  <img src={file.source} alt="artwork" class="object-cover" />
		</div>
	  </li>
	{/each}
  </ul>
  

<style scoped>
	img {
		width: 100%;
		height: 100%;
	}

	.block {
		border: 0.5rem solid #fff;
		transition: 0.25s;
	}

	.block:hover {
		transform: scale(1.01);
	}
</style>
