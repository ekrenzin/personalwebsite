

export async function fetchComments(source: string){
    
    // API call
    const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ source, method: "list" }),
        headers: {
            'content-type': 'application/json'
        }
    });
    const res = await response.json();
    const { results } = res;
    if (!results) {
        return [];
    }
    return results;
}

interface commentRequestBody {
    comment: string;
    user: string;
    source: string;
}

export async function postComment(body: commentRequestBody){
    // API call
    const { comment, user, source } = body;
    return await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ comment, source, user, method: 'upload' }),
        headers: {
            'content-type': 'application/json'
        }
    });    
}

export type Comment = {
    CommentID: number;
    User: string;
    CommentText: string;
    SourceID: string;
    CreatedAt: string; // ISO 8601 format date string
    UpdatedAt: string; // ISO 8601 format date string
};