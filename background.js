chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.tabs.create({
      url: chrome.runtime.getURL("/pages/downloaded.html"),
    });
  } else if (details.reason === "update") {
    chrome.tabs.create({ url: chrome.runtime.getURL("/pages/update.html") });
  }
});
// Set a URL to open when the extension is uninstalled
chrome.runtime.setUninstallURL(
  "https://your-feedback-page.com/uninstall-survey"
);
