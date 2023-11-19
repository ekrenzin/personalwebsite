
const baseUrl = '/writing';

export const fetchMarkdownPosts = async (fetch) => {
    try {
        const markdownJson = await fetch(`${baseUrl}/posts.json`);
        const markdownData = await markdownJson.json();
        const categories = Object.keys(markdownData);
        console.log('categories', categories)
        const returnData = {};
        for (const category of categories) {
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
        const markdownJson = await fetch(`${baseUrl}/posts.json`);
        const markdownData = await markdownJson.json();

        //get the index of the current post
        const currentIndex = markdownData[prefix].findIndex(post => post.title === `${suffix}`);

        //get the next post
        return markdownData[prefix][currentIndex];
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


