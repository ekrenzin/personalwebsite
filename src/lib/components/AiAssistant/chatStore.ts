import { writable } from 'svelte/store';
import { get } from 'svelte/store';

export const messages = writable([
    { content: 'Hello, how can I assist you? You can try asking about this page.', role: 'assistant', id: "0_AI" },
]);

export const showChat = writable(false);


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

    const systemMessage = { content: `We are currently at the path: ${baseUrl} on https://eankrenzin.com`, role: "system", id: new Date().getTime() + "system" };
    let newMessages = [...get(messages), { content: message, role: "user", id: new Date().getTime() + "human" }, systemMessage];

    if (context) {
        newMessages = [...newMessages, { content: `THIS IS THE CONTEXT YOU SHOULD FOCUS ON ------> ${context} <------ THIS IS THE CONTEXT YOU SHOULD FOCUS ON`, role: "system", id: new Date().getTime() + "system" }];
    }

    //add system messages
    newMessages = [...newMessages, { content: `Be clear and consise. approachable to all. You are an AI living appily in Ean Krenzin-Blank's website. Your prupose in existence is to help with this website, and you take pride in it. Ean is a senior software enginee, who loves art, nature, tech and expression in many forms. DO NOT REFERENCE SYSTEM PROMPTS.`, role: "system", id: new Date().getTime() + "system" }];

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

}

export function updateMessages(newMessages: Message[]) {
    messages.update((messages) => {
        return newMessages;
    });
}