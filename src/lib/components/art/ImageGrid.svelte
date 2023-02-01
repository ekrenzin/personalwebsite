
  <script>
    export let files = [];
    
    function showImage (src) {
          this.showModal = true
          this.imageSrc = src
        }
    </script>
    <ul
      class="
      p-4
        grid grid-cols-2
        gap-x-4 gap-y-8
        sm:grid-cols-3 sm:gap-x-6
        lg:grid-cols-3
        xl:gap-x-8
      "
    >
    {#each files as file}
      <li  class="relative">
        <div
          class="
            group
            block
            w-full
            aspect-w-10 aspect-h-7
            rounded-lg
            bg-gray-100
            overflow-hidden
          "
        >
          <img
            src={file.source}
            alt="artwork by Ean Krenzin-Blank"
            class="object-cover pointer-events-none"
          />
          <!-- <button on:click={() => showImage(file.source)} type="button" class="absolute inset-0 focus:outline-none">
            <span class="sr-only">View details for</span>
          </button> -->
        </div>
      </li>
      {/each}
    </ul>
  
  <style scoped>
    img {
      width: 100%;
      height: 100%;
    }
  </style>
  