<script>
    import '../../md.css'
</script>

<svelte:head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
</svelte:head>

<div class="bg" />
<slot />
<style>
    .bg {
        background-color: rgba(25, 20, 20, 0.95);
        position: fixed;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        z-index: -1;
    }
</style>