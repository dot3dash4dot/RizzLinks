# RizzLinks

Chrome extension to allow you to copy readable Jira, ServiceNow, and GitHub PR links to your clipboard at the click of a button.

Find it unhelpful when someone sends you a link to a Jira issue like [ABC-123](https://jira.atlassian.com/browse/ABC-123) and you have to load the issue to see what the issue is? Wouldn't it be nice if everyone could just as easily send you an easily readable link like [ABC-123: Add unit tests](https://jira.atlassian.com/browse/ABC-123)? Well now they can!

The extension also supports creating readable links for ServiceNow pages (see below for additional instructions), so now you can send someone a link like [Incident123](https://dev12345.service-now.com/nav_to.do?uri=incident.do?sys_id=1234567890abcdef) rather than https://dev12345.service-now.com/nav_to.do?uri=incident.do?sys_id=1234567890abcdef

With the extension installed, simply navigate to the Jira issue, ServiceNow or GitHub PR page, and either:
* Right-click on the page > select ![icon](src/assets/icon16.png) `Copy RizzLink`
* Click on the extension's icon ![icon](src/assets/icon16.png) in the toolbar (see Installation step below)

This copies the readable link to your clipboard in both HTML and Markdown formats. The relevant format will be used when pasting into e.g. emails (HTML) or Slack (Markdown).

You also get some visual feedback when 
* The issue's title being copied is temporarily hightlighted on the webpage
* A green success message will appear on the extension's icon in the toolbar (if you've added it)

### Jira

You will also get a readable link for if you're on a Jira board or filter page and have clicked on an issue to open it in the Jira side panel. 

### ServiceNow

Because ServiceNow entities are custom for each installation, there's no point in including the code for a particular system in the code. Instead, you'll need to manually add them into the extension's code as follows:
1. Load ServiceNow in Chrome, and navigate to an example for the entity type you're interested in
2. Right-click on the field you want to use for your link's title and click 'Inspect'. In the Elements view that opens:
    * Right-click the highlighted page element then select `Copy` > `Copy selector`
    * Search in the page source code for a page element starting with `macroponent` - note this for the next step
3. In `background.js` find the `// Add your ServiceNow selectors here` section, and add your selector to one of the lists underneath
    * If the element appears on a page with a `macroponent` element, add the selector to `macroponentElementSelectors`
    * Otherwise add it to `simpleElementSelectors`
4. Repeat for the other pages you want to add to RizzLinks

## Installation

1. Clone the repository or download the source code.
2. If you want to generate ServiceNow links, see the additional instructions above to add selectors to the extension's code. 
3. Open Chrome and navigate to `chrome://extensions/`.
4. Enable "Developer mode" by toggling the switch in the top right corner.
5. Click on "Load unpacked" and select the `chrome-extension` directory.
6. The extension should now be installed and visible in your extensions list.
7. You can create RizzLinks through the right-click menu on a relevant webpage, but if you'd like to be able to also create them by clicking in the toolbar:
    1. Click the Extensions icon in the Chrome toolbar (in the top right)
    2. Find RizzLinks in the list and click the `Pin` button
    3. The RizzLinks icon will now appear in the toolbar - just click it to create your link

## Tests

To run the automated tests, navigate to the `src` folder on a Command Line, and type `npm test`

## License

This project is licensed under the MIT License.