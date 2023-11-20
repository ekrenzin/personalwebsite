import fs from 'fs';
import path from 'path';
import cheerio from 'cheerio';
import { parse } from 'marked';

const baseUrl = 'static/writing';

/**
 * Reads files from a directory with enhanced error handling and logging.
 * @param {string} type - The category type.
 * @returns {Promise<Object[]>} - An array of objects containing file information.
 */
async function readFiles(type) {
    try {
        const directory = path.resolve(`${baseUrl}/${type}`);
        console.log(`Reading files from directory: ${directory}`);
        const files = await fs.promises.readdir(directory);
        return await Promise.all(
            files.map(async (file) => {
                try {
                    const filePath = path.join(directory, file);
                    const content = await fs.promises.readFile(filePath, 'utf8');
                    const preview = extractPreview(content);
                    const { imageSources } = parseMarkdown(content);
                    const title = path.basename(file, '.md');
                    const data = { title, preview, url: `writing/${type}_${title}`, imageSources };

                    if (imageSources && imageSources.length > 0) {
                        data.image = imageSources[0];
                    }
                    return data
                } catch (fileReadError) {
                    console.error(`Error reading file ${file}: ${fileReadError}`);
                    return null;
                }
            })
        );
    } catch (dirReadError) {
        console.error(`Error reading directory ${type}: ${dirReadError}`);
        return [];
    }
}

/**
 * Gets the categories from the directory names.
 * @returns {Promise<string[]>}
 */
async function getCategories() {
    try {
        const dirs = await fs.promises.readdir(baseUrl, { withFileTypes: true });
        return dirs.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
    } catch (error) {
        console.error(`Error fetching categories: ${error}`);
        return [];
    }
}

/**
 * Extracts a preview from the content.
 * @param {string} content - The content from which to extract the preview.
 * @returns {string} - A string representing the preview.
 */
function extractPreview(content) {
    const contentPreview = content.substring(0, 200) + "...";
    return contentPreview;
}

/**
 * Prebuilds JSON data from writing categories.
 * @returns {Promise<void>}
 */
async function buildJSON() {
    console.log("PREBUILDING JSON");
    try {
        const returnData = {};
        const categories = await getCategories();
        //ignore these categories
        const ignoredCategories = ['images'];
        const cleanedCategories = categories.filter(category => !ignoredCategories.includes(category));
        for (const category of cleanedCategories) {
            console.log(`Processing category: ${category}`);
            returnData[category] = await readFiles(category);
        }

        // Output the return data to a JSON file
        const json = JSON.stringify(returnData, null, 2);
        await fs.promises.writeFile(`${baseUrl}/posts.json`, json, 'utf8');
        console.log(`File is written successfully!`);
        return returnData;
    } catch (error) {
        console.error(`Error in prebuildJSON: ${error}`);
    }
}


function parseMarkdown(markdown) {
    const html = parse(markdown);

    //load cheerio parse images
    const $ = cheerio.load(html);

    //get all images
    const images = $('img');
    const imageSources = [];
    for (const image of images) {
        imageSources.push(image.attribs.src);
    }
    
    return { html, imageSources }
}

export { buildJSON }