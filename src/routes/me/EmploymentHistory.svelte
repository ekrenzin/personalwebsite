<script>
	import { slide } from 'svelte/transition';

	// Define employment history as an array of objects for modular design
	const employmentHistory = [
		{
			period: 'Jul 2021 — Present',
			title: 'Senior Full Stack Software Engineer',
			company: 'SOS Technologies',
			location: 'Miami',
			website: 'https://sos-tech.com/',
			duties: [
			]
		},
		{
			period: 'May 2020 — Present',
			title: 'Senior Full Stack Software Engineer',
			company: 'Vali Ventures',
			location: 'San Francisco',
			website: 'https://vali.ventures/',
			duties: [
			]
		},
		{
			period: 'Sep 2018 — May 2020',
			title: 'Junior iOS Engineer',
			company: 'Graphic Executions',
			location: 'New York',
			website: 'https://graphicexecutions.com/',
			duties: [
			]
		},
		{
			period: 'Aug 2017 — Sep 2018',
			title: 'Entry-Level Graphic Designer',
			company: 'Graphic Executions',
			location: 'New York',
			website: 'https://graphicexecutions.com/',
			duties: [
			]
		}
	].map((job) => ({ ...job, showDuties: true }));
</script>

<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative pt-10" id="employment-history">
	<div class="mt-16">
		<div class="flex justify-between  mb-4">
		<h2 class="text-2xl font-semibold">Employment History</h2>
		<!-- <a href="https://eankrenzin-personal-website.s3.us-west-1.amazonaws.com/Resume.pdf" target="_blank" rel="noreferrer" class="text-center bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300">Download Resume</a> -->

	</div>
		{#each employmentHistory as job}
			<div class="mb-8 p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-200 frosted">
				<div class="flex justify-between">
					<h3 class="text-xl font-semibold">{job.title} - <span class="text-blue-400">{job.company}</span></h3>
					<span class="text-blue-200">{job.period}</span>
				</div>
				<p class="text-blue-400 mb-2">{job.location}, United States</p>
				{#if job.showDuties}
					<ul transition:slide class="list-inside custom-list">
						{#each job.duties as duty}
							<li class="mb-1 pl-4 text-slate-100">{duty}</li>
						{/each}
					</ul>
				{/if}
				<!-- <button
					class="text-blue-200 hover:underline"
					on:click={() => (job.showDuties = !job.showDuties)}
				>
					<b
						>{#if job.showDuties}Hide{:else}Show{/if}</b
					>
				</button> -->
                {#if job.showDuties && job.website}
                <div class="my-4 text-right">
                  <a
                    href={job.website}
                    target="_blank"
                    rel="noreferrer"
                    class="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600"
                  >
                    Visit Company Website
                  </a>
                </div>
              {/if}
              
			</div>
		{/each}
	</div>
</section>

<style>
	.frosted {
		backdrop-filter: blur(10px);
		background-color: rgba(100, 255, 255, 0.1);
	}
	.custom-list {
		list-style-type: none;
	}
	.custom-list li::before {
		content: '\2022'; /* Unicode bullet point */
		display: inline-block;
		width: 1em; /* Width of bullet point */
		margin-left: -1em; /* Shift bullet point to the left */
	}
</style>
