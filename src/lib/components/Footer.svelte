<script lang="ts">
    import SocialButton from "$lib/components/SocialButton.svelte";
    import github from "$lib/assets/icons/brand_github.svg";
    import linkedin from "$lib/assets/icons/brand_linkedin.svg";
    import instagram from "$lib/assets/icons/brand_instagram.svg";
    import twitter from "$lib/assets/icons/brand_twitter.svg";
</script>

  <footer class="max-w-7xl mx-auto py-16 px-4 sm:py-10 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto px-4 overflow-hidden sm:px-6 lg:px-8">
      <div class="mt-8 flex justify-center space-x-6">
        <SocialButton
          icon={github}
          href="https://github.com/ekrenzin"
        />
        <SocialButton
          icon={linkedin}
          href="https://www.linkedin.com/in/ean-krenzin-blank-3b180b137/"
        />
        <SocialButton
          icon={instagram}
          href="https://instagram.com/eankrenzin"
        />
        <SocialButton
          icon={twitter}
          href="https://twitter.com/ekrenzin8"
        />
      </div>
    </div>
    <p class="mt-8 text-center text-base text-sky-300">
      &copy; 2021-{new Date().getFullYear()} Ean Krenzin-Blank. All rights reserved.
    </p>
    <div class="privacy-container">
    <a href="/privacy">Privacy policy for my random projects</a>
  </div>
  </footer>

  <style>
    .privacy-container {
      display: flex;
      justify-content: center;
      opacity: 0.25;
      transition: 0.5s;
    }

    .privacy-container:hover {
      opacity: 1;
    }

    a {
      margin: auto;
      text-align: center;
    }
  </style>