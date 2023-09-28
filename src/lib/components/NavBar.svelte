<script lang="ts">
	import { page } from '$app/stores';
	import logo from '$lib/assets/logo.svg';

	let showMenu: boolean = false;
	let links = [
		{
			href: '/home',
			name: 'Home',
			alts: [],
			icon: null
		},
		{
			href: '/demo',
			name: 'Demo',
			alts: [],
			icon: null
		},
        {
            href: '/art',
            name: 'Art',
			alts: [],
            icon: null
        },
		{
			href: '/me',
			name: 'Me',
			alts: [""],
			icon: null
		},
		{
			href: '/contact',
			name: 'Contact',
			alts: [],
			icon: null
		},
		{
			href: '/old',
			name: 'Old Sites',
			alts: [],
			icon: null
		}
	];
</script>

<style>
	a {
		transition: 0.2s;
	}

	nav {
		z-index: 100;
	}
</style>

<nav class="" >
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<div class="flex items-center">
				<div class="flex-shrink-0">
					<img
						class="block h-8 w-auto lg:hidden"
						src={logo}
						alt="Your Company"
					/>
					<img
						class="hidden h-8 w-auto lg:block"
						src={logo}
						alt="Your Company"
					/>
				</div>
				<div class="hidden sm:ml-6 sm:block">
					<div class="flex space-x-4">
                        
				{#each links as link}
                        {#if link.href === $page.url.pathname || link.alts.includes($page.url.pathname)}
                            <a
                                href={link.href}
                                class="rounded-md bg-blue-700 px-3 py-2 text-md font-medium text-white"
                                >{link.name}</a
                            >
                        {:else}
                            <a
                                href={link.href}
                                class="rounded-md px-3 py-2 text-md font-medium hover:bg-blue-400 text-white"
                                >{link.name}</a
                            >
                        {/if}
                    {/each}
					</div>
				</div>
			</div>

			<div class="-mr-2 flex sm:hidden">
				<!-- Mobile menu button -->
				<button
					type="button"
					on:click={() => (showMenu = !showMenu)}
					class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 bg-sky-500 text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
					aria-controls="mobile-menu"
					aria-expanded="false"
				>
					<span class="sr-only">Open main menu</span>
					<svg
						class="block h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="white"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
					<svg
						class="hidden h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="white"
						aria-hidden="true"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile menu, show/hide based on menu state. -->
	{#if showMenu}
		<div class="sm:hidden " id="mobile-menu">
			<div class="space-y-1 px-2 pt-2 pb-3">
				{#each links as link}
					{#if link.href === $page.url.pathname || link.alts.includes($page.url.pathname)}
						<a
							href={link.href}
							class="block rounded-md bg-sky-700 px-3 py-2 text-base font-medium text-white"
							>{link.name}</a
						>
					{:else}
						<a
							href={link.href}
							class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-sky-600 hover:text-white"
							>{link.name}</a
						>
					{/if}
				{/each}
			</div>
		</div>
	{/if}
</nav>
