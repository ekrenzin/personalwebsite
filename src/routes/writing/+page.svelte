<script lang="ts">
    import BlogItem from './BlogItem.svelte';
    import { onMount } from 'svelte';
    import '../../md.css'
  
    interface mdData {
      title: string;
      preview: string;
      url: string;
    }

    interface blogData { essays: Array<mdData>, stories: Array<mdData>, poems: Array<mdData>, musings: Array<mdData> }
    
    export let data: blogData;
  </script>
  
  <section align="center">
<h1>Hello, and welcome</h1>
<h2> This is <u>MY</u> creative space, where I deal with both depression and joy.</h2>
<p>
  Much of the content on this page is either explicit, or not professional. I think that's ok. Indeed, much of this writing is from a 
  younger man than I am today; Some stems from college, some from before. Some of it, however, is more recent.
  The phenomenologist in me considers these writings to be a snapshot of my life at the time of writing.
  In other words, the person who wrote the words no longer exists, and "I" - the person currating this collection - am simply an auditor.


  <br />
  <br />

  <b><u>Not everything we project should be for the purpose of earning money or conforming to expectations.</u></b> Sometimes we need to exhale the bad air.
  It occured to me that I'd rather share my musings than carry the weight of them alone. It occured to me that this was the definition of
  being alone.

  <br />
  <br />

  Ultimately, I wrote many of these poems and musings in dark moments, but I feel as though sharing them is a way for me to step in to the light.
  To an extent, I believe that's what art is. It's a way for us to share our experiences, and to connect with others. To an extent,
  I believe that's what life is.

</p>
</section>  

<section>
  <h1>Short Essays</h1>
  {#each data.essays as post}
    <div class="post">
      <BlogItem markdownContent={post} />
    </div>
  {/each}
</section>
  <section>
    <h1>Short Fiction Stories</h1>
    {#each data.stories as post}
      <div class="post">
        <BlogItem markdownContent={post} />
      </div>
    {/each}
  </section>
  <section>
    <h1>Musings</h1>
    {#each data.musings as post}
      <div class="post">
        <BlogItem markdownContent={post} />
      </div>
    {/each}
  </section>
  <section>
    <h1>Poems</h1>
    {#each data.poems as post}
      <div class="post">
        <BlogItem markdownContent={post} />
      </div>
    {/each}
  </section>

  <style>
     section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
    }

    section {
        margin: auto;
        padding: 2rem;
        max-width: 1000px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .post {
      width: 100%;
    }
  </style>