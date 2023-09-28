<script lang="ts">
    import Footer from "$lib/components/Footer.svelte";

</script>
<div class="relative overflow-hidden ">
	<div class="relative pt-6 pb-16 sm:pb-24">
		<div class="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6">
			<div class="text-center">
				<h1
					class="
                  text-4xl
                  tracking-tight
                  font-extrabold
                  text-gray-900
                  sm:text-5xl
                  md:text-6xl
                "
				>
					<span class="block text-gray-50">Ean Krenzin-Blank</span>
					<span class="block text-sky-200">Software Engineer</span>
				</h1>
				<p
					class="
                  mt-3
                  max-w-md
                  mx-auto
                  text-base text-gray-100
                  sm:text-lg
                  md:mt-5 md:text-xl md:max-w-3xl
                "
				>
					Innovating by engineering solutions for Virtual Reality, Web, Mobile, and Desktop.
				</p>
			</div>
		</div>
	</div>
	<div class="relative">
		<div class="absolute inset-0 flex flex-col" aria-hidden="true">
			<div class="flex-1" />
			<div class="flex-1 w-full" />
		</div>
		<div class="w-full mx-auto px-4 sm:px-6">
			<video
				class="relative rounded-lg shadow-lg w-full"
				src="https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/dashboard.mp4"
				autoplay
				loop
				muted
				playsinline
			/>
		</div>
	</div>

    <Footer />
</div>

<style>

	video {
		max-width: 1200px;
		margin: auto;
	}
</style>
