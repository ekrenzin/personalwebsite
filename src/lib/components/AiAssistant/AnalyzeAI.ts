
import { sendMessage, showChat } from './chatStore';

function analyzeText(text: string) {
    try {
    const html = document.body.innerHTML;
    showChat.set(true);
    sendMessage(`Analyze my selected text: ${text}`, window.location.pathname, html);
    } catch (error) {
        console.log(error);
    }
}

function generateImage(text: string) {
    try {
    const html = document.body.innerHTML;
    showChat.set(true);
    sendMessage(`Generate image from my selected text: ${text}`, window.location.pathname, html);
    } catch (error) {
        console.log(error);
    }
}



function AnalyzeWithAI(context: string) {
    try {
    showChat.set(true);
    sendMessage(`Analyze`, window.location.pathname, context);
} catch (error) {
    console.log(error);
}

}

function GenerateImageWithAI(context: string) {
    try {
    showChat.set(true);
    sendMessage(`Generate Image`, window.location.pathname, context);
} catch (error) {
    console.log(error);
}
}




export { analyzeText, generateImage, AnalyzeWithAI, GenerateImageWithAI };