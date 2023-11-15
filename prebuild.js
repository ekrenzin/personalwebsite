import fs from 'fs';
import path from 'path';

const baseUrl = 'static/writing';
async function prebuildJSON() {
    console.log("PREBUILDING")
    try {
        const returnData = {};
        const categories = ['essays', 'poems', 'stories', 'musings'];


        // Function to read files from a directory
        async function readFiles(type) {
            const directory = path.resolve(`${baseUrl}/${type}`);
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
        fs.writeFile(`${baseUrl}/posts.json`, json, 'utf8', (err) => {
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


function extractPreview(content) {
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


prebuildJSON();