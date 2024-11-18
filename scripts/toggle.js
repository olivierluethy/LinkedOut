// Remove sorting part
const filterPart = document.querySelector(
  '[id^="ember"].mb2.artdeco-dropdown.artdeco-dropdown--placement-bottom.artdeco-dropdown--justification-right.ember-view'
);
if (filterPart) {
  filterPart.remove();
}

// Select field view filter
const filterView = document.querySelector(".feed-sort-toggle-dsa__wrapper");
if (filterView) {
  filterView.remove();
}

// See new posts button / If user doesn't folow anyone
const newPostsButton = document.querySelector(
  ".artdeco-button.artdeco-button--secondary.mv5.t-14.t-black.t-normal"
);
if (newPostsButton) {
  newPostsButton.remove();
}

// Remove the element with the class "feed-follows-module"
const addtoFeed = document.querySelector(".feed-follows-module");
if (addtoFeed) {
  addtoFeed.remove();
}

// Remove the news section
const newsElement = document.getElementById("feed-news-module");
if (newsElement) {
  newsElement.remove();
}

// Remove new posts button
const newPosts = document.querySelector(".feed-new-update-pill");
if (newPosts) {
  newPosts.remove();
}

// Remote the footer part
const footer = document.querySelector(".scaffold-layout__aside");
if (footer) {
  footer.remove();
}

// Remove Try Premium Button in feed on the left side of profile section
const tryFeedPremium = document.querySelector(
  ".app-aware-link.link-without-visited-state.feed-identity-module__anchored-widget.feed-identity-module__anchored-widget--premium-upsell.t-12.t-black.t-bold.link-without-hover-state.text-align-left"
);
if (tryFeedPremium) {
  tryFeedPremium.remove();
}

// Function to toggle the visibility of the main feed
function toggleMainFeed(displayState) {
  const mainElement = document.querySelector(
    ".scaffold-finite-scroll.scaffold-finite-scroll--infinite"
  );
  if (mainElement) {
    mainElement.style.display = displayState;
  }
}

// Toggle function to choose between different functionalities
function toggleFunctionality(isToggleActive) {
  if (isToggleActive) {
    toggleMainFeed("block");
    togglePostsWithHeader("none");
  } else {
    toggleMainFeed("none");
    togglePostsWithHeader("block");
  }
}

function togglePostsWithHeader(display) {
  if (display === "block") {
    const contentContainer = document.querySelector(".relative"); // Ersetzen Sie dies durch den spezifischen Selektor von LinkedIn

    // Create a MutationObserver instance
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // Check for added nodes
        if (mutation.addedNodes.length > 0) {
          const addedNodes = Array.from(mutation.addedNodes);
          addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const relativeElements = node.querySelectorAll(
                "[data-view-name='feed-full-update']"
              );
              relativeElements.forEach((relativeElement) => {
                const updateHeader = relativeElement.querySelector(
                  ".update-components-header__text-wrapper"
                );
                if (updateHeader) {
                  relativeElement.remove();
                }
              });
            }
          });
        }
      });
    });

    // Configure the observer to watch for changes in child nodes
    const config = { childList: true, subtree: true };

    // Observe the content container for mutations
    if (contentContainer) {
      observer.observe(contentContainer, config);
    }

    // Run the script initially for existing content
    const relativeElements = document.querySelectorAll(
      "[data-view-name='feed-full-update']"
    );
    relativeElements.forEach((relativeElement) => {
      const updateHeader = relativeElement.querySelector(
        ".update-components-header__text-wrapper"
      );
      if (updateHeader) {
        relativeElement.remove();
      }
    });

    // "See new posts" button removal
    const newPosts = document.querySelector(
      "button.artdeco-button.artdeco-button--secondary.mv5.t-14.t-black.t-normal"
    );
    if (newPosts) {
      newPosts.style.display = "none";
    }

    autoClick();
  }
}

// Listen for changes in toggle state from chrome.storage
chrome.storage.local.get(["toggleState"], (res) => {
  const isToggleActive = res.toggleState ?? false;
  toggleFunctionality(isToggleActive);
});

// Observe for future changes in toggle state
chrome.storage.onChanged.addListener((changes) => {
  if (changes.toggleState) {
    const isToggleActive = changes.toggleState.newValue;
    toggleFunctionality(isToggleActive);
  }
});
