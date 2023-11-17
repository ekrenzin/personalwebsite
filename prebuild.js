import fs from 'fs';
import path from 'path';

const baseUrl = 'static/writing';

// Function to read files from a directory with enhanced error handling and logging
async function readFiles(type) {
    try {
        const directory = path.resolve(`${baseUrl}/${type}`);
        console.log(`Reading files from directory: ${directory}`);
        const files = await fs.promises.readdir(directory);
        return await Promise.all(
            files.map(async (file) => {
                try {
                    const filePath = path.join(directory, file);
                    console.log(`Reading file: ${filePath}`);
                    const content = await fs.promises.readFile(filePath, 'utf8');
                    const preview = extractPreview(content);
                    const title = path.basename(file, '.md');
                    return { title, preview, url: `writing/${type}_${title}` };
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

async function prebuildJSON() {
    console.log("PREBUILDING");
    try {
        const returnData = {};
        const categories = ['essays', 'poems', 'stories', 'musings'];

        for (const category of categories) {
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

function extractPreview(content) {
    let contentPreview = "";
    const endOfFirstParagraph = content.indexOf('\n\n');
    if (endOfFirstParagraph !== -1) {
        contentPreview = content.substring(0, endOfFirstParagraph);
    } else {
        contentPreview = content;
    }
    if (contentPreview.length > 200) {
        contentPreview = contentPreview.substring(0, 200) + "...";
    }
    return contentPreview;
}

prebuildJSON();