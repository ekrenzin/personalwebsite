
/**
 * Fetches comments from the server with pagination support.
 * This function is designed for an infinitely scrolling comment list.
 * @param {string} source - The source identifier for the comments.
 * @param {number} page - The current page number.
 * @param {number} limit - The number of comments to fetch per page.
 * @returns {Promise<Array>} A promise that resolves to an array of comments.
 */
export async function fetchPaginatedComments(page = 1, limit = 10) {
    // API call with pagination parameters
    const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ page, limit, method: "all" }),
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
    const res = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ comment, source, user, method: 'upload' }),
        headers: {
            'content-type': 'application/json'
        }
    });    

    //if the status is not 200, throw an error
    if (res.status !== 200) {
        throw new Error(res.statusText);
    }

    //return the response
    return res;
}

export type Comment = {
    CommentID: number;
    User: string;
    CommentText: string;
    SourceID: string;
    CreatedAt: string; // ISO 8601 format date string
    UpdatedAt: string; // ISO 8601 format date string
};
