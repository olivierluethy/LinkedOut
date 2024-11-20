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
  if (window.location.href.includes("linkedin.com/feed/")) {
    const promoAd = document.querySelector(".update-components-promo");
    if (promoAd) {
      promoAd.style.display = "none";
    }

    // Falls der Benutzer Inhalte sehen möchte, aber sie schon vorher gesehen hat
    if (isToggleActive && contentAlreadyThere == 1) {
      const contentContainer = document.querySelector(".relative");
      if (contentContainer) {
        contentContainer.style.visibility = "visible";
      }
    }
    // Falls der Benutzer Inhalte nicht sehen möchte, aber sie bereits gesehen hat
    else if (!isToggleActive && contentAlreadyThere == 1) {
      const contentContainer = document.querySelector(".relative");
      if (contentContainer) {
        contentContainer.style.visibility = "hidden";
      }
    }
    // Falls der Benutzer die Inhalte nicht gesehen hat, und sie noch nicht gesehen hat
    else if (!isToggleActive && contentAlreadyThere == 0) {
      const contentContainer = document.querySelector(".relative");
      if (contentContainer) {
        contentContainer.style.visibility = "hidden";
      }
    } else if (isToggleActive && contentAlreadyThere == 0) {
      const contentContainer = document.querySelector(".relative");
      if (contentContainer) {
        contentContainer.style.visibility = "visible";
      }
      togglePostsWithHeader();
    }
  }
}
let alertDisplay = 0;
function togglePostsWithHeader() {
  chrome.storage.local.get(["toggleState"], (res) => {
    const isToggleActive = res.toggleState ?? false;
    if (isToggleActive) {
      const contentContainer = document.querySelector(".relative");

      if (alertDisplay == 0) {
        alert(
          "Experience it live as we showcase our ability to filter out irrelevant content while preserving posts created by the people you follow!"
        );
        alertDisplay++;
      }

      // Set a timeout of 3 seconds before starting to block content
      setTimeout(() => {
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
      }, 1000); // 3000 milliseconds = 3 seconds
    }
  });
}

let contentAlreadyThere = 0;
// Listen for changes in toggle state from chrome.storage
chrome.storage.local.get(["toggleState"], (res) => {
  const isToggleActive = res.toggleState ?? false;
  toggleFunctionality(isToggleActive);
  if (isToggleActive) {
    contentAlreadyThere = 1;
  }
});

// Observe for future changes in toggle state
chrome.storage.onChanged.addListener((changes) => {
  if (changes.toggleState) {
    const isToggleActive = changes.toggleState.newValue;
    toggleFunctionality(isToggleActive);
  }
});
