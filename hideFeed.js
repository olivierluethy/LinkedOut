// Function to remove the feed, news section, and the feed follows module
function removeElements() {
  // Remove notifications tab
  const notifyClock = document.querySelector(
    '.global-nav__nav[aria-label="Primary Navigation"] ul.global-nav__primary-items li:nth-child(5)'
  );
  if (notifyClock) {
    notifyClock.style.visibility = "hidden";
  }
  // Remove Try Premium for CHF0 on navigation
  const tryNavPremium = document.querySelector(".premium-upsell-link");
  if (tryNavPremium) {
    tryNavPremium.style.visibility = "hidden";
  }
  // Remove red button over home house button
  const redButtonHouse = document.querySelector(
    ".notification-badge.notification-badge--show "
  );
  if (redButtonHouse) {
    redButtonHouse.style.display = "none";
  }
  // Remove elements inside the feed
  if (window.location.href.includes("linkedin.com/feed/")) {
    // Remove sorting part
    const filterPart = document.querySelector(
      '[id^="ember"].mb2.artdeco-dropdown.artdeco-dropdown--placement-bottom.artdeco-dropdown--justification-right.ember-view'
    );
    if (filterPart) {
      filterPart.remove();
    }

    // Remove the main feed element
    const mainElement = document.querySelector(".relative");
    if (mainElement) {
      mainElement.remove();
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

    // Remote the footer part
    const footer = document.querySelector(".scaffold-layout__aside");
    if (footer) {
      footer.remove();
    }
    // Remove Try Premium Button in feed on the left side of profile section
    const tryFeedPremium = document.querySelector(".app-aware-link.link-without-visited-state.feed-identity-module__anchored-widget.feed-identity-module__anchored-widget--premium-upsell.t-12.t-black.t-bold.link-without-hover-state.text-align-left");
    if (tryFeedPremium) {
      tryFeedPremium.remove();
    }
  }
  // Remove elements inside "mynetwork"
  else if (
    window.location.href.startsWith("https://www.linkedin.com/mynetwork/grow")
  ) {
    // Remove related connection to just accepted connection
    const relatedConnect = document.querySelector(".mn-suggester.artdeco-card");
    if (relatedConnect) {
      relatedConnect.remove();
    }

    // Remove connection recommendations
    const networkGrow = document.querySelector(
      ".scaffold-finite-scroll__content"
    );
    if (networkGrow) {
      networkGrow.remove();
    }

    // Remove show more button
    const showMore = document.querySelector(
      ".scaffold-finite-scroll.scaffold-finite-scroll--finite"
    );
    if (showMore) {
      showMore.remove();
    }
  }
  // Remove elements inside the profile part
  else if (window.location.href.startsWith("https://www.linkedin.com/in")) {
    // Die ganze rechte Seite
    const embeddedNetwork = document.querySelector(
      "aside.scaffold-layout__aside"
    );

    if (embeddedNetwork) {
      // Keep Profile language and Public profile & URL section alive
      const keepAliveClass = embeddedNetwork.querySelector(
        ".pv-profile-info-section.artdeco-card.p4.mb2"
      );

      // Überprüfen, ob das Element #artdeco-modal-outlet vorhanden ist
      const modalOutlet = document.querySelector("#artdeco-modal-outlet");

      // Remove all child nodes of embeddedNetwork except for keepAliveClass and modal popup
      Array.from(embeddedNetwork.childNodes).forEach((node) => {
        // Check if the node is the keepAliveClass or the modalOutlet
        if (node !== keepAliveClass && node !== modalOutlet) {
          node.remove();
        }
      });

      // Sicherstellen, dass das modalOutlet sichtbar ist
      if (modalOutlet) {
        modalOutlet.style.display = "block";
      }
    }
  } else if (window.location.href.includes("linkedin.com/groups/")) {
    const recommendedGroups = document.querySelector(
      'aside.scaffold-layout__aside[aria-label="Groups you might be interested in"]'
    );
    if (recommendedGroups) {
      recommendedGroups.remove();
    }
  }
}
/* Wenn man schnell ohne Reload tabs switcht damit die Route trotzdem überprüft wird */
// Attempt to continuously remove elements if they load later
const maxPing = 5;
const waitBetweenPings = 100;

async function attemptToRemoveElement(elementName) {
  let ping = 0;
  let removed = false;

  async function wait(ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const element = document.getElementById(elementName);
        if (element) {
          element.remove();
          removed = true;
        }
        ping++;
        resolve();
      }, ms);
    });
  }

  while (!removed && ping < maxPing) {
    await wait(waitBetweenPings);
  }
}

// Set an interval to attempt to remove elements every 5 seconds
setInterval(() => {
  removeElements(); // Remove immediately if elements exist
  attemptToRemoveElement("feed-news-module"); // Try to remove the news section if it loads later
}, 100);

// Immediately attempt to remove elements on script run
removeElements();