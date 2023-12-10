
import { parse, Renderer } from 'marked';
import cheerio from 'cheerio';
import DOMPurify from 'dompurify';

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
    const cleanHtml = DOMPurify.sanitize(data);
    const htmlContent = parse(cleanHtml, { renderer });
    return htmlContent;
}


export function cleanMD(text: string) {
    let htmlContent = parse(text);
    const $ = cheerio.load(htmlContent);
    
    //use cheerio to remove all div align center

    $('div').each(function (i, elem) {
        if ($(this).attr('align') === 'center') {
            $(this).replaceWith($(this).html());
        }
    });

    //remove images
    $('img').each(function (i, elem) {
        $(this).replaceWith('');
    });

    /*
        replace text that is denoting a tag ("#tag") with a custom div. \
        Do not do this for text which goes # content - as this is a heading
        Multiple tags in a single line will be replaced with multiple divs
    */
    // const regex = /#\([^]+)\}/g;
    // htmlContent = htmlContent.replace(regex, (match, tagName) => {
    //     const div = `<div class="tag">${tagName}</div>`;
    //     console.log(div);
    //     return div;
    // });


    htmlContent = $.html();
    
    return htmlContent;
}
