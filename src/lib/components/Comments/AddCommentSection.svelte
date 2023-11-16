<script lang="ts">
	import { postComment } from './Comments';

	export let source = 'test';
    export let handleComments: (src: string) => void;

	let comment: string;
	let name: string;

	async function handleSubmit() {
		if (!comment || !name) {
			alert('Please fill out all fields');
			return;
		}

		await postComment({ source, user: name, comment: comment });
        handleComments(source);
		comment = '';
		name = '';
	}
</script>

<style>
    input, textarea {
        width: 100%;
        color: black;
    }
</style>
<div class="flex flex-col space-y-4">
    <h2>Add Comment:</h2>
	<input
		required
		bind:value={name}
		placeholder="Name"
		class="px-4 py-2 border border-gray-800 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
	/>
	<textarea
		required
		bind:value={comment}
		placeholder="Comment"
		class="px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:border-blue-500 transition duration-200"
	/>
	<button
		on:click={handleSubmit}
		class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
		>Submit</button
	>
</div>
