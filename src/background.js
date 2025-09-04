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

                const htmlLink = `<a href="${url}">${issueSummary}</a>`;
                navigator.clipboard.writeText(htmlLink).then(() => {
                    console.log('Copied to clipboard:', htmlLink);
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