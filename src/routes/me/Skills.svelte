<script>
	// Define skills as an array for modular design
	const skills = [
  {
    name: 'HTML & CSS',
    icon: 'fab fa-html5',
    description: 'Expertise in building semantically correct, responsive, and highly performant front-end layouts.'
  },
  {
    name: 'MySQL / Postgres',
    icon: 'fas fa-database',
    description: 'Proficient in designing, querying, and optimizing relational databases for high-concurrency scenarios.'
  },
  {
    name: 'JavaScript / TypeScript / C#',
    icon: 'fab fa-js-square',
    description: 'Advanced proficiency in client-side and server-side scripting languages, ensuring optimal functionality and user experience.'
  },
  {
    name: 'TCP / IP and Internet Routing',
    icon: 'fas fa-network-wired',
    description: 'Solid understanding of networking protocols and internet routing, instrumental in debugging and optimizing web services.'
  },
  {
    name: 'Agile Development',
    icon: 'fas fa-people-carry',
    description: 'Experienced in Agile methodologies, promoting adaptive planning and evolutionary development.'
  },
  {
    name: 'WebRTC',
    icon: 'fas fa-video',
    description: 'Skilled in implementing real-time communication features in web applications.'
  },
  {
    name: 'AWS/Google Cloud',
    icon: 'fas fa-cloud',
    description: 'Well-versed in cloud computing platforms, capable of deploying and managing scalable and secure applications.'
  },
  {
    name: 'React / Vue / Svelte',
    icon: 'fab fa-react',
    description: 'Strong expertise in modern front-end frameworks, enhancing UI performance and maintainability.'
  }
];

</script>

<!-- Skills Component -->
<svelte:head>
	<link
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
		rel="stylesheet"
	/>
</svelte:head>

<section class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 h-full relative">
    <h2 class="text-2xl font-semibold mb-2">Skills</h2>
    <ul>
      {#each skills as skill}
        <li class="mb-1 flex items-center relative group">
          <i class="{skill.icon} mr-2"></i>
          {skill.name}
          <!-- Tooltip -->
          <div class="absolute z-10 hidden w-56 p-2 mt-12 ml-12 text-sm leading-tight text-white transform -translate-y-1/2 bg-black rounded-lg group-hover:block">
            {skill.description}
          </div>
        </li>
      {/each}
    </ul>
  </section>