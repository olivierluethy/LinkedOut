// Function to remove the feed, news section, and the feed follows module
function removeElements() {
  startPoints();
  // If user tries to cheat and tries to get access to notifications through URL
  if (
    window.location.hostname === "www.linkedin.com" &&
    window.location.pathname.startsWith("/notifications")
  ) {
    window.location.href = "https://www.linkedin.com/";
  }

  // Remove elements inside the feed
  if (window.location.href.includes("linkedin.com/feed/")) {
    togglePostsWithHeader("block");
  }
  // Remove elements inside "mynetwork"
  else if (
    window.location.href.startsWith("https://www.linkedin.com/mynetwork/grow")
  ) {
    mynetwork();
  }
  // Remove elements inside the profile part
  else if (window.location.href.startsWith("https://www.linkedin.com/in")) {
    profile();
  } else if (window.location.href.includes("linkedin.com/groups/")) {
    const recommendedGroups = document.querySelector(
      'aside.scaffold-layout__aside[aria-label="Groups you might be interested in"]'
    );
    if (recommendedGroups) {
      recommendedGroups.remove();
    }
  }
}

// Function to observe changes in the DOM
const observer = new MutationObserver(removeElements);
observer.observe(document.body, { childList: true, subtree: true });

// Immediately attempt to remove elements on script run
removeElements();