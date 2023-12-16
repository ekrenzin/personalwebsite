const baseUrl = '/writing';


export const fetchMarkdownPosts = async (fetch) => {
    try {
        const markdownJson = await fetch(`${baseUrl}/posts.json`);
        const markdownData = await markdownJson.json();
        const categories = Object.keys(markdownData);
        

        const returnData = {};
        const ignoreCategories = ["KJV-Bible", 'short-essays'];
        for (const category of categories) {
            if (ignoreCategories.includes(category)) {
                continue;
            }
            const categoryData = markdownData[category];
            returnData[category] = categoryData;
        }

        return returnData;
    } catch (error) {
        console.error('Error fetching Markdown posts:', error);
        throw error; // Rethrow the error for further handling
    }
}


/**
 * Fetches the content of a Markdown post.
 * 
 * @param {string} prefix - The prefix of the file path.
 * @param {string} suffix - The suffix of the file path.
 * @returns {Promsie<{ post: string, nextPost: any, previousPost: any, currentPost:  }>}} - The content of the Markdown post.
 */
export const fetchMarkdownPost = async (fetch, { prefix, suffix }) => {
    try {
        const markdown = await fetch(`${baseUrl}/${prefix}/${suffix}.md`);
        const post = await markdown.text();

        const nextPost = await fetchNextMarkdownPost(fetch, { prefix, suffix });
        const previousPost = await fetchPreviousMarkdownPost(fetch, { prefix, suffix });
        const currentPost = await fetchCurrentMarkdownPost(fetch, { prefix, suffix });
        const data = { post, nextPost, previousPost, currentPost };
        return data;
    } catch (error) {
        console.error('Error fetching Markdown post:', error);
        throw error; // Rethrow the error for further handling
    }
}

export const fetchCurrentMarkdownPost = async (fetch, { prefix, suffix }) => {
    try {
        const markdown = await fetch(`${baseUrl}/${prefix}/${suffix}.md`);
        const post_text = await markdown.text();

        const markdownJson = await fetch(`${baseUrl}/posts.json`);
        const markdownData = await markdownJson.json();

        //get the index of the current post
        const currentIndex = markdownData[prefix].findIndex(post => post.title === `${suffix}`);

        const post = markdownData[prefix][currentIndex];
        const title = extractTitle(post_text);

        post.title = title;

        return post;
    } catch (error) {
        console.error('Error fetching Markdown post:', error);
        throw error; // Rethrow the error for further handling
    }
}


export const fetchNextMarkdownPost = async (fetch, { prefix, suffix }) => {
    try {
        let returnPost = null;
        const markdownJson = await fetch(`${baseUrl}/posts.json`);
        const markdownData = await markdownJson.json();

        //get the index of the current post
        const currentIndex = markdownData[prefix].findIndex(post => post.title === `${suffix}`);

        //get the next post
        const nextPost = markdownData[prefix][currentIndex + 1];

        if (!nextPost) {
            //if the next post does not exist, check if there is a next category
            //if there is a next category, get the first post of that category
            //if there is no next category, return the first post of the first category
            const categories = Object.keys(markdownData);
            const currentCategoryIndex = categories.indexOf(prefix);
            const nextCategory = categories[currentCategoryIndex + 1];
            if (nextCategory) {
                returnPost = markdownData[nextCategory][0];
            } else {
                returnPost = markdownData[categories[0]][0];
            }
        } else {
            returnPost = nextPost;
        }

        return returnPost;
    } catch (error) {
        console.error('Error fetching Markdown post:', error);
        throw error; // Rethrow the error for further handling
    }
}


export const fetchPreviousMarkdownPost = async (fetch, { prefix, suffix }) => {
    try {
        let returnPost = null;
        const markdownJson = await fetch(`${baseUrl}/posts.json`);
        const markdownData = await markdownJson.json();

        //get the index of the current post
        const currentIndex = markdownData[prefix].findIndex(post => post.title === `${suffix}`);

        //get the previous post
        const previousPost = markdownData[prefix][currentIndex - 1];
        if (!previousPost) {
            //if the previous post does not exist, check if there is a previous category
            //if there is a previous category, get the first post of that category
            //if there is no previous category, return the first post of the first category
            const categories = Object.keys(markdownData);
            const currentCategoryIndex = categories.indexOf(prefix);
            const previousCategory = categories[currentCategoryIndex - 1];
            if (previousCategory) {
                returnPost = markdownData[previousCategory][0];
            } else {
                returnPost = markdownData[categories[categories.length-1]][ markdownData[categories[categories.length-1]].length - 1];
            }
        } else {
            returnPost = previousPost;
        }

        return returnPost;
    } catch (error) {
        console.error('Error fetching Markdown post:', error);
        throw error; // Rethrow the error for further handling
    }
}

function extractTitle(markdown: string) {
    //look for the first line that begins wth # or ## and return the text after that
    const lines = markdown.split('\n');
    let title = '';
    for (const line of lines) {
        if (line.startsWith('#') || line.startsWith('##')) {
            title = line.replace('#', '').trim();
            title = title.replace('#', '').trim();
            break;
        }
    }
    return title;
}
/**
 * Search through posts based on a given search term.
 * @param {Function} fetch - The fetch function to make HTTP requests.
 * @param {string} searchTerm - The term to search for in the posts.
 * @return {Promise<Array>} - A promise that resolves to an array of matching posts.
 */
export async function searchPosts(fetch, searchTerm) {
    try {
        // Fetch the content from the server
        const response = await fetch(`${baseUrl}/content.json`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the response as JSON
        const posts = await response.json();

        // Filter posts based on the search term
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        const filteredPosts = posts.filter(post => {
            // Assuming each post object has properties like title, content, etc.
            // Adjust the fields to search based on your post object structure
            return post.title.toLowerCase().includes(lowercasedSearchTerm) ||
                   post.content.toLowerCase().includes(lowercasedSearchTerm);
        });

        return filteredPosts;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; // Or handle error as per your application's error handling policy
    }
}
