<script lang="ts">
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import logo from '$lib/assets/logo.svg';

	let showMenu: boolean = false;
    let showDropdown = false; // New state for dropdown visibility

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
            icon: null,
            subLinks: [
                {
                    href: '/me#story',
                    name: 'Story'
                },
                {
                    href: '/me#employment-history',
                    name: 'Resume'
                },
				{
					href: "/writing",
					name: "Creative Writing"
				}
            ]
        },
		{
			href: '/contact',
			name: 'Contact',
			alts: [],
			icon: null
		},
		{
			href: '/old',
			name: 'History',
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

	 /* Desktop hover styles */
	 .dropdown:hover .dropdown-menu {
        display: block; /* Show dropdown on hover */
    }

    .dropdown-menu {
        display: none; /* Hide dropdown by default */
        position: absolute;
        left: 0;
		top: 90%;
        z-index: 1;
        /* Add more styling as needed */
    }

	.dropdown-menu a {
		background-color: #1f2937;
	}

	.dropdown-menu a:hover {
		background-color: #0e1118;
	}
</style>

<nav class="">
	<div class="mx-auto max-w-screen-xl px-8 sm:px-12 lg:px-16 py-4">
	  <div class="flex h-20 items-center sm:justify-center justify-between">
		<div class="flex items-center space-x-12 sm:space-x-0">
		  <div class="flex-shrink-0">
			<div class="mr-10">
					<img
						class="block h-8 w-auto lg:hidden"
						src={logo}
						alt="Ean Krenzin"
					/>
					<img
						class="hidden h-8 w-auto lg:block"
						src={logo}
						alt="Ean Krenzin"
					/>
				</div>
				</div>
				<div class="hidden sm:ml-6 sm:block">
					<div class="flex space-x-4">
                        
						<div class="hidden sm:ml-6 sm:block">
							<div class="flex space-x-4">
								{#each links as link}
									<div class="relative dropdown"> 
										<a href={link.href} class="{link.href === $page.url.pathname || link.alts.includes($page.url.pathname) ? 'rounded-md bg-blue-900 px-3 py-2 text-md font-medium text-white' : 'rounded-md px-3 py-2 text-md font-medium hover:bg-blue-400 text-white'}" on:click={() => { if (link.subLinks) showDropdown = !showDropdown }}>{link.name}</a>
										{#if link.subLinks}
											<div class="absolute left-0 mt-2 shadow-md dropdown-menu">
												{#each link.subLinks as subLink}
													<a href={subLink.href} class="block px-4 py-2 text-sm text-gray-100">{subLink.name}</a>
												{/each}
											</div>
										{/if}
									</div>
								{/each}
							</div>
						</div>
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
    <div class="sm:hidden" id="mobile-menu" in:fade>
        <div class="space-y-1 px-2 pt-2 pb-3">
            {#each links as link}
                <div class="relative dropdown">
                    
                    {#if link.subLinks}
                            {#each link.subLinks as subLink}
							<a href={subLink.href} class="block rounded-md hover:bg-sky-500  px-3 py-2 text-base font-medium text-white">{subLink.name}</a>
                            {/each}
							{:else}
							<a href={link.href} class="block rounded-md hover:bg-sky-500  px-3 py-2 text-base font-medium text-white">{link.name}</a>
                    {/if}
                </div>
            {/each}
        </div>
    </div>
{/if}
</nav>
