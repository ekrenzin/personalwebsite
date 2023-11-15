
import { parse, Renderer } from 'marked';

const renderer = new Renderer();

// Override how paragraphs are handled
renderer.paragraph = (text) => {
    // Split text by double line breaks to identify paragraphs
    return text
        .split(/\n\n+/)
        .map((paragraph) => {
            // Split each paragraph by single line break to identify lines
            return `<p style="display: block; margin-bottom: 0.75rem">${paragraph
                .split(/\n/)
                .map((line) => `<span style="display: block; margin-bottom: 0.25rem">${line}</span>`)
                .join('')}</p>`;
        })
        .join('');
};

// Override how blockquotes are handled
renderer.blockquote = (quote) => {
    // Wrap the blockquote in a <blockquote> tag and apply italic styling
    return `<blockquote>${quote}</blockquote>`;
};

// Use the custom renderer in the parse function
export function loadHtml(data: string) {
    const htmlContent = parse(data, { renderer });
    return htmlContent;
}