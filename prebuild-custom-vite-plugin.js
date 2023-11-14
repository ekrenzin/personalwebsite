// vite-plugin-run-script.js
import { spawn } from 'child_process';

function runScriptPlugin() {
  return {
    name: 'run-script-on-hmr',
    handleHotUpdate({ server, file }) {
      // Check if the changed file is posts.json
      if (file.endsWith('posts.json')) {
        // If it's posts.json, do nothing
        return;
      }
      // Run your script here
      const process = spawn('node', ['prebuild.js'], { stdio: 'inherit' });

      process.on('close', (code) => {
        if (code !== 0) {
          console.error(`prebuild.js script exited with code ${code}`);
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
