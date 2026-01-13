const fs = require('fs');
const path = require('path');

/**
 * Extract and return the getLinks function from background.js
 */
function extractGetLinksFunction() {
    const backgroundJsPath = path.resolve(__dirname, '../background.js');
    const backgroundJs = fs.readFileSync(backgroundJsPath, 'utf8');

    // Extract the getLinks function using a regex
    const getLinksMatch = backgroundJs.match(/function getLinks\(.*?}\/\/end/s);
    if (!getLinksMatch) {
        throw new Error('getLinks function not found in background.js');
    }

    return new Function("return " + getLinksMatch[0])();
}

/**
 * Read and parse HTML from a test page file
 * @param {string} sourcePath - Relative path to the HTML file
 * @returns {string} - Cleaned HTML content without the head section
 */
function loadTestHtml(sourcePath) {
    const htmlPath = path.resolve(__dirname, sourcePath);
    const html = fs.readFileSync(htmlPath, 'utf8');
    return html.replace(/<head>.*<\/head>/s, "");
}

module.exports = {
    extractGetLinksFunction,
    loadTestHtml
};