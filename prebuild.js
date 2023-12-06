import { buildJSON } from './prebuild/buildJSON.js';
import { cleanAllNotes } from './prebuild/cleanNotes.js';


await buildJSON();
cleanAllNotes();