<script lang="ts">
	import { fade } from 'svelte/transition';
	import { Tween } from '@tweenjs/tween.js';
	import type { view } from '$lib/types/scene';
	export let currentView: view;
	export let loadView: (viewName: string, override: boolean) => void;
	export let advanceView: () => void;
	export let decrementView: () => void;

	let opacity = 1;
	let activeView: view;
	let tweens: any = [];

	function fadeBetween(reload: any) {
		tweens.forEach((tween: any) => {
			tween.stop();
		});
		const fadeOutTween = new Tween({ opacity: 1 })
			.to({ opacity: 0 }, 1000)
			.onUpdate((obj) => {
				opacity = obj.opacity;
			})
			.onComplete(() => {
				activeView = currentView;
				const fadeInTween = new Tween({ opacity: 0 })
					.to({ opacity: 1 }, 1000)
					.onUpdate((obj) => {
						opacity = obj.opacity;
					})
					.start();
				tweens.push(fadeInTween);
			})
			.start();
		tweens.push(fadeOutTween);
	}

	$: fadeBetween(currentView);
</script>
<div class="text-container">
{#if activeView}
	<div class="mt-10 ">
		<div
			style={`opacity: ${opacity}; max-width: 1000px;  margin: auto; border-radius: 20px`}
			class="py-4 px-2  "
		>
			{#if activeView.name == 'orbiters'}
				<div class="mx-auto sm:px-6 py-4 px-2 backdrop-blur bg-white/500">
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
							<span class="block text-cyan-300">Software Engineer</span>
						</h1>
						<p
							class="
			mt-3
			mx-auto
			text-base text-gray-300
			sm:text-lg
			md:mt-5 md:text-xl md:max-w-3xl
		  "
						>
							Innovating by engineering solutions for Virtual Reality, Web, Mobile, and Desktop.
						</p>

						<button
							class="
		mt-3
		max-w-md
		mx-auto
		text-base text-white
		sm:text-lg
		md:mt-5 md:text-xl md:max-w-3xl px-8 py-2 rounded-full pulse-accent bg-sky-500 mx-4"
							on:click={advanceView}
						>
							Click here to begin.
						</button>
					</div>
				</div>
			{:else if activeView.name === 'explanation'}
				<div class="mx-auto sm:px-6  sm:px-6 py-4 px-2 backdrop-blur bg-white/500">
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
							<span class="block text-gray-50">So what is</span>
							<span class="block text-cyan-300">This?</span>
						</h1>
						<p
							class="
			mt-3
			mx-auto
			text-base text-gray-300
			sm:text-lg
			md:mt-5 md:text-xl md:max-w-3xl
		  "
						>
							This is a threejs scene that uses a custom bloom shader and over 500 flying 3D objects
							to create a scene that is both visually stunning and interactive. You can customize
							the colors in real time using the color pickers (bottom right). Otherwise the colors
							will automatically become more random.
						</p>

						<button
							class="
		mt-3
		max-w-md
		mx-auto
		text-base text-white
		sm:text-lg
		md:mt-5 md:text-xl md:max-w-3xl px-8 py-2 rounded-full pulse-accent bg-sky-500 mx-4"
							on:click={advanceView}
						>
							Let's see Projects
						</button>
					</div>
				</div>
			{:else if activeView.name === 'desktop'}
				<div class="mx-auto max-w-7xl px-4 sm:px-6">
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
							<span class="block text-gray-50">This is</span>
							<span class="block text-sky-500">Desktop Vision</span>
						</h1>
						<p
							class="
			mt-3
			mx-auto
			text-base text-gray-300
			sm:text-lg
			md:mt-5 md:text-xl md:max-w-3xl
		  "
						>
							This is Desktop Vision. Your computer in the cloud. Try interacting with it, you can
							control your computer from here if you authorize a connection!
						</p>
						<p
							class="
			mt-3
			max-w-md
			mx-auto
			text-base text-white
			sm:text-lg
			md:mt-5 md:text-xl md:max-w-3xl
		  "
						>
							<a
								href="https://desktop.vision"
								target="_blank"
								rel="noreferrer"
								class="inline-flex items-center font-medium text-pink-300 dark:text-pink-300 hover:underline"
							>
								Check it out
								<svg
									aria-hidden="true"
									class="w-5 h-5 ml-1"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
									><path
										fill-rule="evenodd"
										d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
										clip-rule="evenodd"
									/></svg
								>
							</a>
						</p>
						<button
							class="
		mt-3
		max-w-md
		mx-auto
		text-base text-white
		sm:text-lg
		md:mt-5 md:text-xl md:max-w-3xl px-8 py-2 rounded-full pulse-accent bg-sky-500 mx-4"
							on:click={advanceView}
						>
							Click here to continue.
						</button>
					</div>
				</div>
			{:else if activeView.name === 'wall'}
			<div class="mx-auto sm:px-6  sm:px-6 py-4 px-2 backdrop-blur bg-white/500">
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
							<span class="block text-gray-50">Now enter</span>
							<span class="block text-sky-300">eankrenzin.com</span>
						</h1>
						<p
							class="
			mt-3
			max-w-md
			mx-auto
			text-base text-gray-300
			sm:text-lg
			md:mt-5 md:text-xl md:max-w-3xl
		  "
						>
							My personal website & playground.
						</p>
						<button
							class="
        mt-3
        max-w-md
        mx-auto
        text-base text-white
        sm:text-lg
        md:mt-5 md:text-xl md:max-w-3xl px-8 py-2 rounded-full pulse-accent bg-gray-400 mx-4"
							on:click={() => loadView('orbiters', true)}>Go Back</button
						>
						<a href="/home"
							><button
								class="
        mt-3
        max-w-md
        mx-auto
        text-base text-white
        sm:text-lg
        md:mt-5 md:text-xl md:max-w-3xl px-8 py-2 rounded-full pulse-accent bg-sky-500 mx-4"
								>Launch</button
							></a
						>
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}
</div>
<style>
	.text-container {
		position: absolute;
		left: 0;
		top: calc(10%);
		justify-content: center;
		align-items: center;
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: auto;
	}
	@keyframes pulse-accent {
		0% {
			box-shadow: 0 0 5px 2px cyan;
		}

		50% {
			box-shadow: 0 0 15px 10px cyan;
		}

		100% {
			box-shadow: 0 0 5px 2px cyan;
		}
	}

	.final {
		position: fixed;
		left: 0;
		top: calc(50vh - 300px);
		justify-content: center;
		align-items: center;
		display: flex;
		flex-direction: column;
		height: 400px;
		width: 100%;
		margin: auto;
	}
</style>
