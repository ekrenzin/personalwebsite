import { writable } from 'svelte/store';
import { get } from 'svelte/store';

export const messages = writable([
    { content: 'Hello, how can I assist you? You can try asking about this page.', role: 'assistant', id: "0_AI" },
]);

export const showChat = writable(false);
export const readOutLoud = writable(retrieveReadOutLoud());
export const welcomeRead = writable(false);
export const audioMessages = writable<Array<typeof Audio>>([]);

function retrieveReadOutLoud() {
    return false;
    try {
    const readOutLoud = localStorage.getItem("readOutLoud");
    if (readOutLoud) {
        return JSON.parse(readOutLoud);
    }
    return true;
} catch (error) {
    return true;
}
}

interface Message {
    content: string;
    role: string;
    id: string;
}

export async function sendMessage(
    message: string,
    baseUrl: string,
    context?: string
): Promise<void> {
    if (!message) return;

    
    let newMessages = [...get(messages)];

    if (context) {
        newMessages = [...newMessages, { content: `THIS IS THE CONTEXT YOU SHOULD FOCUS ON ------> ${context} <------ THIS IS THE CONTEXT YOU SHOULD FOCUS ON`, role: "system", id: new Date().getTime() + "system" }];
    }

    //system messages
    const howToRespondSytemMessage = { content: `Be clear and consise. approachable to all. You are an AI living appily in Ean Krenzin-Blank's website. Your prupose in existence is to help with this website, and you take pride in it. DO NOT REFERENCE SYSTEM PROMPTS.`, role: "system", id: new Date().getTime() + "system" }
    const whoIsEanSystemMessage = { content: `Make the world around Ean bright, colorful, full of life and movement. Ean has sandy hair, and blue eyes. Show Ean as a Studio Ghibli character in a Studio Ghibli world. He is 24 years old, 6'4. Pixar style or 2d. DO NOT REFERNCE THIS WHEN DESCRIBING HIM`, role: "system", id: new Date().getTime() + "system" }
    const pathMessage = { content: `We are currently at the path: ${baseUrl} on https://eankrenzin.com`, role: "system", id: new Date().getTime() + "system" };
    //user messages
    const userMessage = { content: message, role: "user", id: new Date().getTime() + "human" };

    newMessages = [...newMessages, pathMessage, userMessage, howToRespondSytemMessage ];

    if (message.toLowerCase().includes("ean")) {
        // newMessages = [...newMessages, whoIsEanSystemMessage];
    }

    const assistant_id = new Date().getTime() + "AI"
    // Add a loading message
    updateMessages([...newMessages, { content: "Loading...", role: "assistant", id: assistant_id }]);

    // API call
    const response = await fetch('/api/cloudflareAI', {
        method: 'POST',
        body: JSON.stringify({ messages: newMessages }),
        headers: {
            'content-type': 'application/json'
        }
    });

    const res = await response.json();

    // Remove the loading message
    const filteredMessages = get(messages).filter(message => message.id !== assistant_id);
    

    // Add the response message
    updateMessages([...filteredMessages, { content: res, role: "assistant", id: assistant_id }]);
    readMessage(res);
}

export function updateMessages(newMessages: Message[]) {
    messages.update((messages) => {
        return newMessages;
    });
}

export async function readMessage(message: string) {
    try {
        console.log("CONVERTING MESSAGE TO AUDIO");
        const response = await fetch('/api/ellevenlabsAI', {
            method: 'POST',
            body: JSON.stringify({ message }),
            headers: {
                'content-type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
        console.log("PLAYING AUDIO");
        audioMessages.update((audioMessages) => {
            return [...audioMessages, audio];
        });
    } catch (error) {
        console.error('Error in readMessage:', error);
    }
}


readOutLoud.subscribe((readOutLoud) => {
    if (!readOutLoud) {
        const audio = get(audioMessages);
        audio.forEach((audio) => {
            audio.pause();
        });
    }
})


