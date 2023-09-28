<script>
    import { fade } from "svelte/transition";
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
  },
{
    name: 'Project Management',
    icon: 'fas fa-tasks',
    description: 'Proven ability to lead projects from conception through completion within fast-paced environments.'
  },
  {
  name: 'Communication & Management',
  icon: 'fas fa-comments',
  description: 'Strong ability to engage and communicate with stakeholders at all levels, ensuring alignment with business goals and successful project delivery.'
},
  {
    name: 'DevOps',
    icon: 'fas fa-tools',
    description: 'Understanding of CI/CD pipelines, infrastructure as code, and other DevOps best practices.'
  },
  {
    name: 'Code Reviews',
    icon: 'fas fa-code',
    description: 'Experience in conducting and overseeing code reviews for quality and performance.'
  },
  {
    name: 'Data Analysis',
    icon: 'fas fa-chart-bar',
    description: 'Capable of interpreting and making data-driven decisions.'
  },
  {
    name: 'Cybersecurity',
    icon: 'fas fa-shield-alt',
    description: 'Understanding of cybersecurity protocols to protect organizational data.'
  },
  {
    name: 'Remote Team Management',
    icon: 'fas fa-globe',
    description: 'Experienced in managing distributed teams and remote workforce.'
  },
  {
    name: 'Accessibility',
    icon: 'fas fa-universal-access',
    description: 'Understanding of web accessibility guidelines and best practices.'
  },
  {
  name: 'Unity & Game Development',
  icon: 'fas fa-gamepad',
  description: 'Experience in developing and managing 3D interactive applications and games using Unity. Skilled in C# scripting, asset management, and real-time simulation.'
},
{
  name: 'iOS',
  icon: 'fab fa-apple',
  description: 'Proficient in Swift and Objective-C, with experience in building and managing robust, scalable iOS applications.'
},
{
  name: 'Android',
  icon: 'fab fa-android',
  description: 'Skilled in Java and Kotlin for Android development, with expertise in managing the full development lifecycle.'
},
{
  name: 'Meta Quest',
  icon: 'fas fa-vr-cardboard',
  description: 'Experience in developing and managing VR applications for the Meta Quest platform, using both Unity and Unreal Engine.'
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
    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {#each skills as skill}
        <li class="group p-4 border rounded-lg hover:border-blue-500 hover:shadow-lg transition duration-300 relative">
          <div class="flex items-center space-x-2">
            <i class="{skill.icon} text-2xl text-blue-500"></i>
            <span>{skill.name}</span>
          </div>
          <!-- Tooltip -->
          <div transition:fade class="absolute z-10 hidden w-56 p-2 mt-12 ml-12 text-sm leading-tight text-white transform -translate-y-1/2 bg-black rounded-lg group-hover:block">
            {skill.description}
          </div>
        </li>
      {/each}
    </ul>
  </section>