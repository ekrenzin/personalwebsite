<script lang="ts">
    import type { Comment } from './Comments';
    export let comment: Comment
</script>

<style>

    .comment-container {
        width: 100%;
        background-color: #f0f0f010; /* Light grey background */
        border-radius: 20px; /* Rounded corners for bubble effect */
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
        margin-bottom: 1rem; /* Space between bubbles */
        padding: 1rem; /* Padding inside the bubble */
        word-wrap: break-word; /* Ensures text wraps inside the bubble */
    }
    
    </style>
    <div class="comment-container shadow-md rounded-lg ">
        <div class="comment-header font-semibold text-lg mb-2">{comment.User}</div>
        <div class="text-sky-600 text-sm mb-2">{comment.UpdatedAt}</div>
        <p class="comment-body">{comment.CommentText}</p>
    </div>