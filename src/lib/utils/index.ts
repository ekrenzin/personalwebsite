
const baseUrl = '/writing'; 

export const fetchMarkdownPosts = async (fetch) => {
    try {
        const categories = ['essays', 'poems', 'musings', 'stories'];
        const markdownJson = await fetch(`${baseUrl}/posts.json`);
        const markdownData = await markdownJson.json();
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
 * @returns {Promise<string>} The content of the Markdown file.
 */
export const fetchMarkdownPost = async (fetch, {prefix, suffix}) => {
    try {
        const markdown = await fetch(`${baseUrl}/${prefix}/${suffix}.md`);
        const content = await markdown.text();
        return content;
    } catch (error) {
        console.error('Error fetching Markdown post:', error);
        throw error; // Rethrow the error for further handling
    }
}

