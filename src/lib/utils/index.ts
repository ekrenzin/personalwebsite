
const baseUrl = '/writing'; 

export const fetchMarkdownPosts = async (fetch) => {
    try {
        const categories = ['essays', 'poems', 'musings', 'stories'];
        const markdownJson = await fetch(`${baseUrl}/posts.json`);
        const markdownData = await markdownJson.json();
        const returnData = {};
        for (const category of categories) {
            const categoryData = markdownData[category];
            for (const post of categoryData) {
                const markdown = await fetch(`${baseUrl}/${category}/${post.title}.md`);
                const content = await markdown.text();
                const preview = extractPreview(content);
                post.preview = preview;
            }
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



function extractPreview(content: any) {
    let contentPreview = "";

    // Find the first paragraph
    const endOfFirstParagraph = content.indexOf('\n\n');
    if (endOfFirstParagraph !== -1) {
        contentPreview = content.substring(0, endOfFirstParagraph);
    } else {
        // If there's no second paragraph, return the whole content
        contentPreview = content;
    }

    //limit preview to 200 characters
    if (contentPreview.length > 200) {
        contentPreview = contentPreview.substring(0, 200) + "...";
    }

    return contentPreview;
}
