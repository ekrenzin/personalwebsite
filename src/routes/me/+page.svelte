<script lang="ts">
    import MeOverview from "./MeOverview.svelte";
    import EmploymentHistory from "./EmploymentHistory.svelte";
    import Skills from "./Skills.svelte";
</script>

<!-- create a tailwind css card with a dark backgorund -->
  <div class="rounded-2xl drop-shadow-lg my-10 mx-10">
    <MeOverview />
    <EmploymentHistory />
    <Skills />
</div>
