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
				'Led a team of software engineers to develop and deploy a complex full-stack React-frontend application in a short timeframe.',
				'Designed and developed a highly-available, fault-tolerant web application using modern AWS cloud technologies.',
				'Worked with Security experts to build a FedRAMP-certified application.',
				'Developed .Net microservices to modularize a modular-monolithic platform.',
				'Instituted robust security protocols to facilitate encrypted communication among diverse stakeholders, including law enforcement agencies.'
			]
		},
		{
			period: 'May 2020 — Present',
			title: 'Senior Full Stack Software Engineer',
			company: 'Vali Ventures',
			location: 'San Francisco',
			website: 'https://vali.ventures/',
			duties: [
				'Orchestrated the development of Desktop Vision, a WebRTC, WebXR-powered remote desktop application, affording device-agnostic and immersive computing experiences.',
				'Architected a highly-available, fault-tolerant system, utilizing modern cloud technologies for optimal scalability.',
				'Engineered paid tiers incorporating Google cloud computing, device sharing, and collaborative tools, thereby widening revenue streams.',
				'Served versatile use-cases ranging from remote work to gaming and education.',
				'Built and deployed native iOS, Android, Meta Quest, Mac, Linux, and Windows applications.'
			]
		},
		{
			period: 'Sep 2018 — May 2020',
			title: 'Junior iOS Engineer',
			company: 'Graphic Executions',
			location: 'New York',
			website: 'https://graphicexecutions.com/',
			duties: [
				'Spearheaded the transition into mobile platforms by contributing to the development of native iOS applications. Utilized Swift and Objective-C to implement feature-rich, user-centric mobile experiences.',
				'Collaborated cross-functionally with graphic designers and branding experts to ensure seamless integration of visual elements into mobile apps.',
				"Deployed applications that served a diverse clientele, from SMBs to artists, reinforcing the company's reputation for high-quality work and rapid turnaround."
			]
		},
		{
			period: 'Aug 2017 — Sep 2018',
			title: 'Entry-Level Graphic Designer',
			company: 'Graphic Executions',
			location: 'New York',
			website: 'https://graphicexecutions.com/',
			duties: [
				'Spearheaded visual strategies that enhanced branding initiatives and digital content. Skilled in utilizing Adobe Creative Suite to design high-impact digital and print media.',
				'Collaborated closely with printing and website development teams to ensure design coherence and quality across platforms.',
				'Contributed to quick turnaround times and earned accolades for exceptional customer service, as evidenced by strong client reviews.',
				"Leveraged understanding of typography, layout, and color theory to produce compelling designs, further solidifying the company's reputation for high-quality output."
			]
		}
	].map((job) => ({ ...job, showDuties: true }));
</script>

<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative">
	<div class="mt-16">
		<h2 class="text-2xl font-semibold mb-4">Employment History</h2>
		{#each employmentHistory as job}
			<div class="mb-8 p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-200 frosted">
				<div class="flex justify-between">
					<h3 class="text-xl font-semibold">{job.title}</h3>
					<span class="text-blue-200">{job.period}</span>
				</div>
				<p class="text-sky-400 mb-2">{job.location}</p>
				{#if job.showDuties}
					<ul transition:slide class="list-inside custom-list">
						{#each job.duties as duty}
							<li class="mb-1 pl-4">{duty}</li>
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
