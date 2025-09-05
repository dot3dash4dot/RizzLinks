chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            func: () => {
                // This code runs in the context of the page

                const url = window.location.href;

                // Extract the issue number from the URL
                const issueNumberMatch = url.match(/\/browse\/([A-Z]+-\d+)/);
                const issueNumber = issueNumberMatch ? issueNumberMatch[1] : null;

                const summaryElement = document.querySelector('#summary-val');

                if (issueNumber && summaryElement) {
                    const issueSummary = `${issueNumber}: ${summaryElement.textContent.trim()}`;

                    // Create the HTML hyperlink
                    const htmlLink = `<a href="${url}">${issueSummary}</a>`;

                    // Create the Markdown version of the link
                    const markdownLink = `[${issueSummary}](${url})`;

                    // Use the ClipboardItem API to copy both Markdown and HTML versions
                    const clipboardItem = new ClipboardItem({
                        'text/plain': new Blob([markdownLink], { type: 'text/plain' }),
                        'text/html': new Blob([htmlLink], { type: 'text/html' }),
                    });

                    navigator.clipboard.write([clipboardItem]).then(() => {
                        console.log('Copied to clipboard with both Markdown and HTML versions:');
                        console.log('Markdown:', markdownLink);
                        console.log('HTML:', htmlLink);

                        // Notify the background script that copying was successful
                        chrome.runtime.sendMessage({ action: "showBadge", status: "success" });
                    }).catch(err => {
                        console.error('Failed to copy:', err);

                        // Notify the background script that copying failed
                        chrome.runtime.sendMessage({ action: "showBadge", status: "failure" });
                    });
                } else {
                    console.error('Failed to extract issue number or summary element.');

                    // Notify the background script that copying failed
                    chrome.runtime.sendMessage({ action: "showBadge", status: "failure" });
                }
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

// Helper function to set badge text and background color
function setBadge(text, color) {
    chrome.action.setBadgeText({ text });
    chrome.action.setBadgeBackgroundColor({ color });

    // Clear the badge after 3 seconds
    setTimeout(() => {
        chrome.action.setBadgeText({ text: "" });
    }, 3000);
}

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "showBadge") {
        if (message.status === "success") {
            // Randomly select a badge text for success
            const successBadgeTexts = ["yay", "sick", "nice", "woop", "1337", "cool", "epic", ":)", "W", "fire", "boss"];
            const randomSuccessText = successBadgeTexts[Math.floor(Math.random() * successBadgeTexts.length)];

            // Set the badge for success
            setBadge(randomSuccessText, "#4CAF50"); // Green background
        } else if (message.status === "failure") {
            // Randomly select a badge text for failure
            const failureBadgeTexts = ["nah", "nope", ":(", "fail", "L", "rip", "bruh", "oops", "smh"];
            const randomFailureText = failureBadgeTexts[Math.floor(Math.random() * failureBadgeTexts.length)];

            // Set the badge for failure
            setBadge(randomFailureText, "#F44336"); // Red background
        }
    }
});