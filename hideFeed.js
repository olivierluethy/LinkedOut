// Function to remove the feed, news section, and the feed follows module
function removeElements() {
  // Remove elements inside the feed
  if (window.location.href.includes("linkedin.com/feed/")) {
    // Remove the main feed element
    const mainElement = document.getElementsByTagName("main")[0];
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
  } 
  // Remove elements inside "mynetwork"
  else if (
    window.location.href.startsWith("https://www.linkedin.com/mynetwork")
  ) {
    const networkGrow = document.querySelector(
      ".scaffold-finite-scroll__content"
    );
    if (networkGrow) {
      networkGrow.remove();
    }
  } 
  // Remove elements inside the profile part
  else if (window.location.href.startsWith("https://www.linkedin.com/in")) {
    const embeddedNetwork = document.querySelector(".scaffold-layout__aside");

    if (embeddedNetwork) {
      // Keep the .pv-profile-info-section.artdeco-card.p4.mb2 element
      const keepAliveClass = embeddedNetwork.querySelector(
        ".pv-profile-info-section.artdeco-card.p4.mb2"
      );

      // Remove all child nodes of embeddedNetwork except for keepAliveClass
      Array.from(embeddedNetwork.childNodes).forEach((node) => {
        // Check if the node is the keepAliveClass
        if (node !== keepAliveClass) {
          node.remove();
        }
      });
    }
  }
}

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
