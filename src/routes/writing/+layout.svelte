<script>
    import '../../md.css'
</script>

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