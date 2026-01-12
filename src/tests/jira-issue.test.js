const fs = require('fs');
const path = require('path');

let getLinks, html;

const sourcePath = "test-pages/jira-issue.html";
const url = "https://jira.atlassian.com/browse/TRELLO-1488";

describe('getLinks', () => {
    beforeAll(() => {
        // Read the contents of background.js
        const backgroundJsPath = path.resolve(__dirname, '../background.js');
        const backgroundJs = fs.readFileSync(backgroundJsPath, 'utf8');

        // Extract the getLinks function using a regex
        const getLinksMatch = backgroundJs.match(/function getLinks\(.*?}\/\/end/s);
        if (!getLinksMatch) {
            throw new Error('getLinks function not found in background.js');
        }
        //console.log('Extracted function:', getLinksMatch[0]);
        getLinks = new Function("return " + getLinksMatch[0])();

        // Read the contents of test source file
        const issueHtmlPath = path.resolve(__dirname, sourcePath);
        const issueHtml = fs.readFileSync(issueHtmlPath, 'utf8');

        html = issueHtml.replace(/<head>.*<\/head>/s, "")
        //console.log('HTML:', html);
    });

    beforeEach(() => {
        // Set up the mock document
        document.body.innerHTML = html;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return correct Markdown and HTML links', () => {
        // Call the function
        const links = getLinks(url);

        // Assert that the function returns the correct links
        expect(links).not.toBeNull();
        expect(links.markdownLink).toBe('[TRELLO-1488: Be able to disable comments for specific cards](https://jira.atlassian.com/browse/TRELLO-1488)');
        expect(links.htmlLink).toBe('<a href="https://jira.atlassian.com/browse/TRELLO-1488">TRELLO-1488: Be able to disable comments for specific cards</a>');
    });

    test('should return null if #summary-val is missing', () => {
        // Remove the #summary-val element
        document.querySelector('#summary-val').remove();

        // Call the function
        const links = getLinks(url);

        // Assert that the function returns null
        expect(links).toBeNull();
    });
});