import fs from 'fs';
import path from 'path';

const inputDir = 'unclean_notes';
const outputDir = 'static/writing/notes';


// Function to parse the input data
// Function to parse the input data
function parseInput(data) {
    const notes = [];
    const lines = data.split(/\r\n|\r|\n/); // Split the data by new lines
  
    // Extract title and author from their specific line positions
    const title = lines[1].trim();
    const author = lines[2].trim();
  
    // Extract highlights, accommodating different characters and potential multiline entries
    const highlightRegex = /Highlight\((blue|yellow|green|red)\) - Page (\d+) [·路] Location (\d+)\s+([\s\S]+?)(?=\nHighlight\(|\n\n|$)/g;
  
    let match;
    while ((match = highlightRegex.exec(data)) !== null) {
      notes.push({
        color: match[1],
        page: match[2],
        location: match[3],
        text: match[4].trim().replace(/\r\n|\r|\n/g, " ") // Replaces newlines with spaces
      });
    }
  
    return {
      title,
      author,
      notes
    };
  }
  


// Function to format notes into Markdown
function formatToMarkdown(parsedData) {
    let markdownContent = `## ${parsedData.title}\n\n`;
    markdownContent += `### Citation\n${parsedData.author}\n\n`;
    markdownContent += `### Notes\n\n`;

    parsedData.notes.forEach(note => {
        markdownContent += `### Note on Page ${note.page} (Location ${note.location})\n> ${note.text}\n\n---\n\n`;
    });

    return markdownContent;
}


// Function to process a single file
function processFile(filePath) {
    console.log("READ FILE", filePath)
    const data = fs.readFileSync(filePath, 'utf-8');
    const notes = parseInput(data);
    const markdownContent = formatToMarkdown(notes);

    const outputFilePath = path.join(outputDir, path.basename(filePath, '.txt') + '.md');
    fs.writeFileSync(outputFilePath, markdownContent);
    
    // Delete the original file
    fs.unlinkSync(filePath);
    console.log(`Deleted original file: ${filePath}`);
}

// Function to process all files in the input directory
function cleanAllNotes() {
    fs.readdir(inputDir, (err, files) => {
        if (err) {
            console.error('Error reading input directory:', err);
            return;
        }

        files.forEach(file => {
                processFile(path.join(inputDir, file));
        });

        console.log('All files processed successfully.');
    });
}

export { cleanAllNotes}

