<script lang="ts">
    import CommentBubble from "./CommentBubble.svelte";
import type { Comment } from "./Comments";
    export let comments: Array<Comment> = [];

    const noCommentTemplate: Comment = {
        CommentID: 0,
        User: "System",
        CommentText: "No comments yet, you could be the first to comment!",
        UpdatedAt: "",

    }
</script>

<style>
.container {
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* Aligns bubbles to the left */
    width: 100%;
    max-height: calc(200px + 30vh);
    overflow: auto;
}

</style>

{#if comments}
<div class="container mx-auto my-10">
    {#each comments as comment}
    <CommentBubble {comment} />
        {:else}
        <CommentBubble comment={noCommentTemplate} />
    {/each}
</div>
{/if}