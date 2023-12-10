import { writable, get, type Writable } from "svelte/store";

interface WritingSettings {
    writing?: Array<string>;
    error?: string;
    loading?: boolean;
    discoColors?: boolean;
}

export const writingSettings: Writable<WritingSettings> = writable();

writingSettings.subscribe(value => {
    //write to local storage
    try {
        localStorage.setItem('writingSettings', JSON.stringify(value));
    } catch (error) {
        console.error("Error in writingStore.ts:", error);
    }
})

//read from local storage
try {
    const lsWritingSettings = localStorage.getItem('writingSettings');
    if (!lsWritingSettings) throw new Error("No writingSettings in local storage");
    writingSettings.set(JSON.parse(lsWritingSettings));
} catch (error) {
    console.error("Error in writingStore.ts:", error);
    const settings: WritingSettings = {
        writing: [],
        error: "none",
        loading: false,
        discoColors: false
    }
    writingSettings.set(settings);

}

export function updateWritingStore(newSettings: WritingSettings) {
    //if the setting is null, then don't update it, if it's false do update.
    const currentSettings = get(writingSettings);
    const updatedSettings = { ...currentSettings, ...newSettings };
    writingSettings.set(updatedSettings)
}