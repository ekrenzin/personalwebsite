<script>
	import { page } from '$app/stores';

	import { onMount } from 'svelte';
</script>



<div class="sites-container">
	<div class="website-container">
        <h1>2021-2022</h1>
		<iframe src="https://personal-2022.pages.dev/" title="personal website 2022" />
	</div>
	<div class="website-container">
        <h1>2019-2021</h1>
		<iframe src="https://personal-2021.pages.dev/" title="personal website 2021" />
	</div>
</div>

<style>
	iframe {
        height: 100%;
		width: 70%;
		border: none;
        border-radius: 5px;
	}

    /* media screen under 800px */
    @media screen and (max-width: 800px) {
        iframe {
            height: 100%;
            width: 80%;
        }
    }

	.website-container {
        width: 100%;
        height: 800px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
		padding: 20px;
		border-radius: 20px;
	}

	.sites-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        height: 100%;
	}

	h1 {
        text-align: center;
		font-size: 50px;
		padding: 20px;
		font-weight: 900;
		line-height: 50px;
		padding-bottom: 10px;
	}
</style>
