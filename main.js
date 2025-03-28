const loopSite = setInterval(() => {
  const { pathname: path, href: url, hostname } = window.location;

  // Clean up notification count in title
  document.title = document.title.replace(/\s*\(\d+\)/g, "");

  navigation();

  // Handle different pages
  if (path === "/feed/") handleFeed();
  else if (path.includes("mynetwork")) handleMyNetwork();
  else if (
    url.match(
      /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-%]+-?[a-zA-Z0-9]*\/?$/
    )
  ) {
    profile();
  } else if (path === "/events/") handleEvents();
  else if (
    hostname === "www.linkedin.com" &&
    path.startsWith("/notifications")
  ) {
    window.location.href = "https://www.linkedin.com/";
  } else if (
    path.match(
      /^\/in\/[a-zA-Z0-9-%]+-?[a-zA-Z0-9]*\/(details\/(interests|languages|skills|projects|certifications)|recent-activity\/all)\/?(\?.*)?$/
    )
  ) {
    // If the URL matches any of the listed patterns
    console.log("Matched LinkedIn details page");
    const adsWidget = document.querySelector(
      "aside[aria-label='Ads and widget recommendations']"
    );
    if (adsWidget) {
      adsWidget.style.display = "none";
    }
    // People you may know or want to follow
    const interested = document.querySelector("aside[aria-label='Interests']");
    if (interested) {
      interested.style.display = "none";
    }
  } else if (
    path.match(
      /^\/in\/[a-zA-Z0-9-%]+-?[a-zA-Z0-9]*\/recent-activity\/(comments|images|reactions)\/?$/
    )
  ) {
    console.log("Matched LinkedIn recent activity page");
    // People you may know or want to follow
    const interested = document.querySelector("aside[aria-label='Interests']");
    if (interested) {
      interested.style.display = "none";
    }
  }

  // Check toggle state and handle additional cases
  chrome.storage.local.get(["toggleState"], ({ toggleState = false }) => {
    try {
      const toggleActive = toggleState;
      const path = window.location.pathname; // Assuming 'path' is from the current URL

      // Company posts
      if (/\/company\/.*?\/posts\//.test(path)) {
        if (toggleActive) handleCompanyPosts();
        else window.location.href = "https://linkedin.com";
      }

      // Company page
      if (/\/company\//.test(path)) {
        hideElement(".scaffold-layout__aside[aria-label='Advertisement']");
      }

      // Recent activity
      if (
        /^\/in\/[a-zA-Z0-9-]+\/recent-activity\/(comments|reactions|all)\/$/.test(
          path
        )
      ) {
        if (toggleActive) handleRecentActivity();
        else window.location.href = "https://linkedin.com";
      }

      // Search results
      if (/^\/search\/results\/all/.test(path)) {
        hideElement(".scaffold-layout__aside[aria-label='Search suggestions']");
      }
    } catch (error) {
      console.error("Error while handling storage or context: ", error);
    }
  });
}, 1000);

function handleEvents() {
  const main = document.querySelector("main");
  if (main) {
    // Get the third child (index 2)
    const thirdChild = main.children[2];

    if (thirdChild) {
      // Remove the third child element
      main.removeChild(thirdChild);
    }
  }
}

function handleFeed() {
  const mainElement = document.querySelector("main[aria-label='Main Feed']");
  if (mainElement?.children[1])
    mainElement.children[1].style.visibility = "hidden";

  const element = document.querySelector(
    "aside[aria-label='Add to your feed']"
  );
  if (element) element.style.display = "none";

  const sidePromo = document.querySelector(
    "div[role='region'][aria-label='Side Bar']"
  );
  if (sidePromo?.children[2]) sidePromo.children[2].style.display = "none";

  const ul = document.querySelector("ul[aria-label='Account']");
  if (ul && ul.firstElementChild) {
    ul.firstElementChild.style.visibility = "hidden";
  }

  handleHomeFeed();
}

function handleCompanyPosts() {
  const targetNode = document.querySelector(".feed-container-theme");
  if (targetNode) {
    console.log("Company part posts found");
    if (!isStopwatchRunning) startStopwatch();
    hideElement(".scaffold-layout__aside[aria-label='Advertisement']");
  }
}

function handleRecentActivity() {
  const targetNode = document.querySelector(".scaffold-layout__sidebar");
  if (targetNode) {
    console.log("Target node found");
    if (!isStopwatchRunning) startStopwatch();
  }
}
