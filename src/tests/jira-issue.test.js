const { extractGetLinksFunction, loadTestHtml } = require('./test-utils');

let getLinks;
const sourcePath = "test-pages/jira-issue.html";
const url = "https://jira.atlassian.com/some-jira-path";

describe('getLinks - Jira', () => {
    beforeAll(() => {
        getLinks = extractGetLinksFunction();
    });

    beforeEach(() => {
        // Set up the mock document
        const html = loadTestHtml(sourcePath);
        document.body.innerHTML = html;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return correct Markdown and HTML links', () => {
        // Call the function
        const links = getLinks(url);

        const expectedURL = "https://jira.atlassian.com/browse/TRELLO-1488";
        const expectedSummary = "TRELLO-1488: Be able to disable comments for specific cards";

        // Assert that the function returns the correct links
        expect(links).not.toBeNull();
        expect(links.markdownLink).toBe(`[${expectedSummary}](${expectedURL})`);
        expect(links.htmlLink).toBe(`<a href="${expectedURL}">${expectedSummary}</a>`);
    });

    test('should return null if #summary-val is missing', () => {
        // Remove the #summary-val element
        document.querySelector('#summary-val').remove();

        // Call the function
        const links = getLinks(url);

        // Assert that the function returns null
        expect(links).toBeNull();
    });

    test('should return null if #key-val is missing', () => {
        // Remove the #key-val element
        document.querySelector('#key-val').remove();

        // Call the function
        const links = getLinks(url);

        // Assert that the function returns null
        expect(links).toBeNull();
    });
});