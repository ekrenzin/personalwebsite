import fs from 'fs';
import path from 'path';
import cheerio from 'cheerio';
import { parse } from 'marked';

const baseUrl = 'static/writing';

/**
 * Asynchronously reads and processes Markdown files from a specified directory.
 * It filters out non-markdown files, reads the markdown content, and extracts necessary data.
 * @param {string} category - The category type representing the subdirectory to read from.
 * @returns {Promise<Object[]>} - An array of objects containing data extracted from each file.
 */
async function processFiles(category, mode) {
    const directory = path.resolve(`${baseUrl}/${category}`);

    try {
        const files = await fs.promises.readdir(directory);
        const data = await Promise.all(files.map(async file => {
            const fileData = await processFilePreviews(directory, file, category)
            switch (mode) {
                case "content":
                    return fileData?.content;
                case "preview":
                    return fileData?.preview;
                default:
                    return fileData.preview;
            }
        }));
        //filter out null values
        return data.filter(d => d);
    } catch (error) {
        console.error(`Error reading directory '${category}': ${error}`);
        return [];
    }
}

/**
 * Processes an individual file. If it's a markdown file, reads its contents and extracts data.
 * @param {string} directory - The directory path.
 * @param {string} file - The file name.
 * @param {string} category - The category type representing the subdirectory to read from.
 * @returns {Promise<Object|null>} - An object containing file data or null if not a markdown file or on error.
 */
async function processFilePreviews(directory, file, category) {
    if (!file.endsWith('.md')) return null;

    try {
        const filePath = path.join(directory, file);
        const content = await fs.promises.readFile(filePath, 'utf8');
        const preview = extractPreview(content);
        const { imageSources, title, scripts } = parseMarkdown(content);
        const titlePath = path.basename(file, '.md');

        const data = {
            post_title: title,
            title: titlePath,
            preview,
            url: `writing/${category}_${titlePath}`,
            imageSources,
            scripts: scripts || []
        };

        if (imageSources?.length > 0) {
            data.image = imageSources[0];
        }

        return {
            preview: data, content: {
                ...data,
                content: `${content}`
            }
        };
    } catch (error) {
        console.error(`Error reading file '${file}': ${error}`);
        return null;
    }
}



/**
 * Replaces specific HTML image formats within Markdown content with Markdown image syntax.
 * @param {string} markdownContent - The Markdown content of the file.
 * @returns {string} - The modified Markdown content.
 */
function replaceHtmlImagesWithMarkdown(markdownContent) {
    const imageDivRegex = /<div style="display: flex; align-items: center; justify-content: center; max-width: 100%;">\s*<img src="([^"]+)" alt="([^"]*)" style="max-width: 100%; max-height: 100%;">\s*<\/div>/g;

    return markdownContent.replace(imageDivRegex, (match, src, alt) => {
        return `![${alt}](${src})`;
    });
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
 * Extracts a preview from the content, excluding Markdown images.
 * @param {string} content - The content from which to extract the preview.
 * @returns {string} - A string representing the preview.
 */
function extractPreview(content) {
    //remove markdown images
    content = content.replace(/!\[.*\]\(.*\)/g, "");
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
        const previewData = {};
        let contentData = [];
        const categories = await getCategories();
        //ignore these categories
        const ignoredCategories = ['images', "KJV-Bible"];
        const cleanedCategories = categories.filter(category => !ignoredCategories.includes(category))

        for (const category of cleanedCategories) {
            previewData[category] = await processFiles(category, 'preview');
            contentData = [...await processFiles(category, 'content'), ...contentData];
        }


        // Output the return data to a JSON file
        const previewJson = JSON.stringify(previewData, null, 2);
        const contentJson = JSON.stringify(contentData, null, 2);
        await fs.promises.writeFile(`${baseUrl}/posts.json`, previewJson, 'utf8');
        await fs.promises.writeFile(`${baseUrl}/content.json`, contentJson, 'utf8');
        console.log(`File is written successfully!`);
        return previewData;
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

    const scriptElements = $('script');
    const scripts = [];
    for (const script of scriptElements) {
        const src = script.attribs.src;
        if (src) {
            scripts.push(src);
        }
    }

    //get the first h1 or h2 tag and use that as the title
    const title = $('h1, h2').first().text();


    return { html, imageSources, title, scripts }
}

export { buildJSON }