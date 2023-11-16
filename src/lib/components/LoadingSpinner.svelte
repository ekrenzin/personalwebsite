<script>
    export let size = 80; // Default size, you can pass a different size as a prop
</script>

<div class="lds-ripple" style="width: {size}px; height: {size}px;">
    <div style="width: {size * 0.9}px; height: {size * 0.9}px; top: {size * 0.05}px; left: {size * 0.05}px;"></div>
    <div style="width: {size * 0.9}px; height: {size * 0.9}px; top: {size * 0.05}px; left: {size * 0.05}px; animation-delay: -0.5s;"></div>
</div>

<style>
    .lds-ripple {
        display: inline-block;
        position: relative;
    }
    .lds-ripple div {
        position: absolute;
        border: 4px solid black;
        opacity: 1;
        border-radius: 50%;
        animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }
    @keyframes lds-ripple {
        0%, 4.9% {
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            opacity: 0;
        }
        5% {
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
        }
    }
</style>
