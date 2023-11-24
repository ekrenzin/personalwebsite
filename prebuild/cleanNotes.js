import fs from 'fs';
import path from 'path';

const inputDir = 'unclean_notes';
const outputDir = 'static/writing/notes';


function parseInput(data) {
  const notes = [];
  const lines = data.split(/\r\n|\r|\n/); // Split the data by new lines

  // Extract title and author from their specific line positions
  const title = lines[1].trim();
  const author = lines[2].trim();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Check if the line starts with 'Highlight'
    if (line.startsWith('Highlight')) {
      // Extract the necessary details from the line
      // The extraction logic will depend on the expected format of the line
      // For example, if the format is consistent, you can use string operations or a simpler regex

      // Example of extracting details using string methods:
      const details = line.split(' '); // Split the line into words
      const color = details[1]; // Assuming the color follows 'Highlight'
      const page = details[3]; // Assuming page number is at a fixed position
      const location = details[5]; // Assuming location is at a fixed position
      let text = '';

      // Collecting the text until the next 'Highlight' or end of data
      while (++i < lines.length && !lines[i].startsWith('Highlight')) {
        text += lines[i] + ' ';
      }
      i--; // Adjust the index since the loop will increment it

      text = text.trim().replace(/\r\n|\r|\n/g, " "); // Clean up the text

      notes.push({
        color,
        page,
        location,
        text
      });
    }
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
    console.log('Cleaning all notes...');
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

