
import { sendMessage, showChat } from './chatStore';

function analyzeText(text: string) {
    const html = document.body.innerHTML;
    showChat.set(true);
    sendMessage(`Analyze my selected text: ${text}`, window.location.pathname, html);
}

function generateImage(text: string) {
    const html = document.body.innerHTML;
    showChat.set(true);
    sendMessage(`Generate image from my selected text: ${text}`, window.location.pathname, html);
}


function AnalyzeWithAI(context: string) {
    showChat.set(true);
    sendMessage(`Analyze`, window.location.pathname, context);
}

function GenerateImageWithAI(context: string) {
    showChat.set(true);
    sendMessage(`Generate Image`, window.location.pathname, context);
}




export { analyzeText, generateImage, AnalyzeWithAI, GenerateImageWithAI };