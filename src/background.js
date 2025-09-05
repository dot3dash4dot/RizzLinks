chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            func: () => {
                // This code runs in the context of the page

                const url = window.location.href;

                // Extract the issue number from the URL
                const issueNumberMatch = url.match(/\/browse\/([A-Z]+-\d+)/);
                const issueNumber = issueNumberMatch ? issueNumberMatch[1] : 'Unknown Issue';

                const summaryElement = document.querySelector('#summary-val');
                let issueSummary = '';

                if (summaryElement) {
                    issueSummary = `${issueNumber}: ${summaryElement.textContent.trim()}`;
                } else {
                    console.error('No <h2> tag found on the page.');
                    issueSummary = `${issueNumber}: No issue title found`;
                }

                // Create the HTML hyperlink
                const htmlLink = `<a href="${url}">${issueSummary}</a>`;

                // Use the ClipboardItem API to copy the hyperlink as HTML
                const blob = new Blob([htmlLink], { type: 'text/html' });
                const clipboardItem = new ClipboardItem({ 'text/html': blob });

                navigator.clipboard.write([clipboardItem]).then(() => {
                    console.log('Copied to clipboard as a hyperlink:', htmlLink);
                }).catch(err => {
                    console.error('Failed to copy:', err);
                });
            },
        },
        (results) => {
            if (chrome.runtime.lastError) {
                console.error("Error injecting script:", chrome.runtime.lastError.message);
            } else {
                console.log("Script executed successfully.");
            }
        }
    );
});