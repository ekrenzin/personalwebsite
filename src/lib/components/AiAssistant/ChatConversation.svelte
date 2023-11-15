<script lang="ts">
    export let message: string;
    export let sender: string;
</script>

<div class={`p-2.5 text-sm w-70 mx-2 my-1 rounded-lg shadow ${sender === 'assistant' ? 'mr-auto' : 'ml-auto'} ${sender === 'assistant' ? 'bg-blue-200 text-blue-800' : 'bg-green-200 text-green-800'}`}>
    {message}
</div>

<style>
    div {
        width: 100%;
    }
</style>
