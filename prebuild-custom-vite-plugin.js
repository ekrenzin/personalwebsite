// vite-plugin-run-script.js
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';


const flagFilePath = path.resolve('.scriptTriggeredChange');

function runScriptPlugin() {
  return {
    name: 'run-script-on-hmr',
    handleHotUpdate({ server, file }) {
      // Check if the change is script-triggered
      try {
        if (fs.existsSync(flagFilePath)) {
          return;
        } 
      } catch (err) {
        console.error(err)
      }

      // Check if the changed file is posts.json
      if (file.endsWith('posts.json')) {
        // If it's posts.json, do nothing
        return;
      }
      // Set the flag before running the script
      fs.writeFileSync(flagFilePath, '');
      const process = spawn('node', ['prebuild.js'], { stdio: 'inherit' });

      process.on('close', (code) => {
        if (code !== 0) {
          console.error(`prebuild.js script exited with code ${code}`);
        } else {
          // Remove the flag file after successful execution, ensuring it exists
          if (fs.existsSync(flagFilePath)) {
            fs.unlinkSync(flagFilePath);
          }
        }
      });

      return server.ws.send({
        type: 'full-reload',
        path: '*'
      });
    }
  };
}

export default runScriptPlugin;
