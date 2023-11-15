
import { writable } from 'svelte/store';

export const messages = writable([
    { content: 'Hello, how can I assist you? You can try asking about this page.', role: 'assistant', id: "0_AI" },
]);