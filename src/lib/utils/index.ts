import fs from 'fs';
import path from 'path';

export const fetchMarkdownPosts = async () => {
    try {
        const returnData = {};
        const categories = ['essays', 'poems', 'stories', 'musings'];


        // Function to read files from a directory
        async function readFiles(type) {
            const directory = path.resolve(`src/lib/assets/writing/${type}`);
            const files = await fs.promises.readdir(directory);
            return await Promise.all(
                files.map(async (file) => {
                    const filePath = path.join(directory, file);
                    const content = await fs.promises.readFile(filePath, 'utf8');
                    const preview = extractPreview(content);
                    const title = path.basename(file, '.md');
                    return { title, preview, url: `writing/${type}_${title}` };
                })
            );
        }

        for (const category of categories) {
            returnData[category] = await readFiles(category);
        }


        //output the return data to a json file
        const json = JSON.stringify(returnData);
        fs.writeFile('src/lib/assets/writing/posts.json', json, 'utf8', (err) => {
            if (err) {
                console.log(`Error writing file: ${err}`);
            } else {
                console.log(`File is written successfully!`);
            }
        }
        );
        return returnData;
    } catch (error) {
        console.log(error);
    }
}

/**
 * Fetches the content of a Markdown post.
 * 
 * @param {string} prefix - The prefix of the file path.
 * @param {string} suffix - The suffix of the file path.
 * @returns {Promise<string>} The content of the Markdown file.
 */
export const fetchMarkdownPost = async (prefix, suffix) => {
    try {
        // Construct the file path
        const filePath = path.join(`src/lib/assets/writing/${prefix}`, `${suffix}.md`);

        // Read the Markdown file content
        const content = await fs.promises.readFile(filePath, 'utf8');
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
