import { buildJSON } from './prebuild/buildJSON.js';
import { cleanAllNotes } from './prebuild/cleanNotes.js';


try {
    await buildJSON();
    cleanAllNotes();
} catch (error) {
    console.error(error);
}