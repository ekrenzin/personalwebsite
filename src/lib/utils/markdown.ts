
import { parse, Renderer } from 'marked';
import cheerio from 'cheerio';
import { sanitize } from "isomorphic-dompurify";

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


/**
 * Loads HTML content, sanitizes it, and processes it with a custom renderer.
 * Falls back to plain text processing if an error occurs.
 * @param {string} data - The HTML data to be processed.
 * @returns Processed content using the custom renderer.
 */
export function loadHtml(data: string) {
    try {
        // Sanitize and process HTML content
        const cleanHtml = sanitize(data);
        return parse(cleanHtml, { renderer });
    } catch (err) {
        console.log(err);
        // Convert to plain text by stripping HTML tags
        const plainText = stripHtmlTags(data);
        // Process plain text with the custom renderer
        return parse(plainText, { renderer });
    }
}

/**
 * Strips HTML tags from a string.
 * @param {string} html - The string containing HTML.
 * @returns The string without HTML tags.
 */
function stripHtmlTags(html) {
    return html.replace(/<\/?[^>]+(>|$)/g, "");
}


export function cleanMD(text: string) {
    let htmlContent = loadHtml(parse(text));
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

export function cleanMDParsed(text: string) {
    //returns cleaned md, but parses out the h2, h1, h3, h4, h5, h6 tags into headers, images into images, and links into links
    let htmlContent = parse(text);
    const $ = cheerio.load(htmlContent);

    //remove images
    $('img').each(function (i, elem) {
        $(this).replaceWith('');
    });

    //remove links
    $('a').each(function (i, elem) {
        $(this).replaceWith('');
    });

    //find headers
    let headers: string[] = [];
    $('h1').each(function (i, elem) {
        headers.push($(this).text());
    });
    $('h2').each(function (i, elem) {
        headers.push($(this).text());
    });

    //now remove headers
    $('h1').each(function (i, elem) {
        $(this).replaceWith('');
    });
    $('h2').each(function (i, elem) {
        $(this).replaceWith('');
    });


    //now return the cleaned text
    htmlContent = $.html();
    
    return { htmlContent, headers };
}