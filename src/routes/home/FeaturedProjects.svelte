<script>
    /**
     * FeaturedProjects Component
     * Display a list of featured projects with a brief description and links.
     */
  
    // Define the projects data.
    const projects = [
      {
        title: "Virtual Reality Simulator",
        description: "A VR-based educational tool for medical training.",
        image: "/path/to/image1.jpg",
        link: "https://github.com/yourname/project1"
      },
      {
        title: "Machine Learning API",
        description: "An API offering real-time predictive analytics.",
        image: "/path/to/image2.jpg",
        link: "https://github.com/yourname/project2"
      },
      // Add more projects here...
    ];
  </script>
  
  <style>
    /* Style your component here */
    .project-card {
      /* ... */
    }
  </style>
  
<section class="mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative">
    <h2 class="text-2xl font-semibold mb-4">Featured Projects</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each projects as project}
        <div class="project-card">
          <img src={project.image} alt="{project.title}" />
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <a href={project.link} target="_blank" rel="noreferrer">Learn More</a>
        </div>
      {/each}
    </div>
  </section>
  