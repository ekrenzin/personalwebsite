<script>
    import '../../md.css'
</script>

<div class="bg" />
<slot />

<style>
    .bg {
        background-color: rgba(25, 20, 20, 0.95);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
</style>