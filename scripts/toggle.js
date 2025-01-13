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

/* Time management */
let stopwatchInterval;
let seconds = 0;
let minutes = 0;
let hours = 0;
let isStopwatchRunning = false;

function updateStopwatch() {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes >= 60) {
    minutes = 0;
    hours++;
  }

  // Zeit in der Konsole ausgeben
  const timeString = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  console.log(timeString);

  // Zeit im Chrome-Storage speichern
  storeWastedTime();
}

function timeStringToSeconds(timeString) {
  const [h, m, s] = timeString.split(":").map(Number);
  return h * 3600 + m * 60 + s;
}

function secondsToTimeString(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(
    s
  ).padStart(2, "0")}`;
}

function initializeStopwatch() {
  const today = new Date().toISOString().split("T")[0];
  chrome.storage.local.get(["wastedTime"], (res) => {
    const wastedTime = res.wastedTime || {};
    const savedTime = wastedTime[today] || "00:00:00";
    const totalSeconds = timeStringToSeconds(savedTime);

    hours = Math.floor(totalSeconds / 3600);
    minutes = Math.floor((totalSeconds % 3600) / 60);
    seconds = totalSeconds % 60;

    lastLoggedSeconds = totalSeconds; // Initialisiere die geloggte Zeit
    console.log(`Stopwatch initialisiert mit: ${savedTime}`);
  });
}

let lastLoggedSeconds = 0; // Speichert die letzte geloggte Zeit (für Differenzen)

function storeWastedTime() {
  if (
    window.location.href.includes("linkedin.com/feed/") ||
    /^\/in\/[a-zA-Z0-9-]+\/recent-activity\/(comments|reactions|all)\/$/.test(
      window.location.pathname
    ) ||
    /\/company\/.*?\/posts\//.test(window.location.pathname)
  ) {
    const today = new Date().toISOString().split("T")[0]; // Nur das Datum (YYYY-MM-DD)
    const currentTimeInSeconds = hours * 3600 + minutes * 60 + seconds;

    // Differenz zur letzten Speicherung berechnen
    const deltaTimeInSeconds = currentTimeInSeconds - lastLoggedSeconds;

    // Check if the delta time is at least 1 second
    if (deltaTimeInSeconds >= 1) {
      // Bestehende Daten abrufen und aktualisieren
      chrome.storage.local.get(["wastedTime"], (res) => {
        const wastedTime = res.wastedTime || {};
        const previousTime = wastedTime[today]
          ? timeStringToSeconds(wastedTime[today])
          : 0;

        // Addiere nur die neue Zeitdifferenz
        const newTimeInSeconds = previousTime + deltaTimeInSeconds;
        wastedTime[today] = secondsToTimeString(newTimeInSeconds);

        // Speichern und `lastLoggedSeconds` aktualisieren
        chrome.storage.local.set({ wastedTime }, () => {
          console.log("Aktualisierte wastedTime:", wastedTime);
          lastLoggedSeconds = currentTimeInSeconds; // Aktualisiere die letzte geloggte Zeit
        });
      });
    } else {
      stopStopwatch();
    }
  } else {
    console.log(
      "Time not sufficient to log. Delta time is less than 1 second."
    );
  }
}

function startStopwatch() {
  if (!isStopwatchRunning) {
    isStopwatchRunning = true;
    stopwatchInterval = setInterval(updateStopwatch, 1000);
    console.log("Stopwatch gestartet");
  }
}

function stopStopwatch() {
  if (isStopwatchRunning) {
    clearInterval(stopwatchInterval);
    isStopwatchRunning = false;

    // Letztes Update, bevor die Stoppuhr gestoppt wird
    storeWastedTime();
    console.log("Stopwatch gestoppt");
  }
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
// TODO: Bei Implementierung einer URL muss diese jeweils an 3 unterschiedlichen Orten hinzugefügt werden - setinterval weiter unten, togglefunctionality, storeWastedTime (weiter oben)
// Toggle function to choose between different functionalities
function toggleFunctionality(isToggleActive) {
  // Ob Benutzer im Activity Flow eines Benutzers ist
  if (
    /^\/in\/[a-zA-Z0-9-]+\/recent-activity\/(comments|reactions|all)\/$/.test(
      window.location.pathname
    ) &&
    !isToggleActive
  ) {
    window.location.href = "https://linkedin.com";
  }
  // Ob Benutzer im Post Flow einer Firma oder Community ist
  if (
    /\/company\/.*?\/posts\//.test(window.location.pathname) &&
    !isToggleActive
  ) {
    window.location.href = "https://linkedin.com";
  }
  if (
    window.location.href.includes("linkedin.com/feed/") ||
    /^\/in\/[a-zA-Z0-9-]+\/recent-activity\/all\/$/.test(
      window.location.pathname
    ) ||
    /\/company\/.*?\/posts\//.test(window.location.pathname)
  ) {
    const promoAd = document.querySelector(".update-components-promo");
    if (promoAd) {
      promoAd.style.display = "none";
    }

    // Falls der Benutzer Inhalte sehen möchte, aber sie schon vorher gesehen hat
    if (isToggleActive && contentAlreadyThere == 1) {
      const contentContainer = document.querySelector(".relative");
      if (contentContainer) {
        contentContainer.style.visibility = "visible";
        startStopwatch();
        initializeStopwatch();
      }
    }
    // Falls der Benutzer Inhalte nicht sehen möchte, aber sie bereits gesehen hat
    else if (!isToggleActive && contentAlreadyThere == 1) {
      const contentContainer = document.querySelector(".relative");
      if (contentContainer) {
        contentContainer.style.visibility = "hidden";
        stopStopwatch();
        initializeStopwatch();
      }
    }
    // Falls der Benutzer die Inhalte nicht gesehen hat, und sie noch nicht gesehen hat
    else if (!isToggleActive && contentAlreadyThere == 0) {
      const contentContainer = document.querySelector(".relative");
      if (contentContainer) {
        contentContainer.style.visibility = "hidden";
        stopStopwatch();
        initializeStopwatch();
      }
    } else if (isToggleActive && contentAlreadyThere == 0) {
      const contentContainer = document.querySelector(".relative");
      if (contentContainer) {
        contentContainer.style.visibility = "visible";
        startStopwatch();
        initializeStopwatch();
      }
      togglePostsWithHeader();
    }
  } else {
    stopStopwatch();
    initializeStopwatch();
  }
}
let alertDisplay = 0;
function togglePostsWithHeader() {
  chrome.storage.local.get(["toggleState"], (res) => {
    const isToggleActive = res.toggleState ?? false;
    if (isToggleActive) {
      const contentContainer = document.querySelector(".relative");

      if (alertDisplay == 0) {
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

// Set an interval to check for various conditions every second
const intervalId = setInterval(() => {
  const pathname = window.location.pathname;
  // Listen for changes in toggle state from chrome.storage
  chrome.storage.local.get(["toggleState"], (res) => {
    const isToggleActive = res.toggleState ?? false;
    // Check for company posts
    if (/\/company\/.*?\/posts\//.test(pathname) && isToggleActive) {
      const targetNode = document.querySelector(".feed-container-theme");
      if (targetNode) {
        console.log("Company part posts found");
        if (!isStopwatchRunning) {
          startStopwatch();
        }
        // Remove "Pages people also viewed"
        const ppav = document.querySelector(
          ".scaffold-layout__aside[aria-label='Advertisement']"
        );
        if (ppav) {
          ppav.style.display = "none";
        }
      }
    }

    if (/\/company\/.*?\/posts\//.test(pathname) && !isToggleActive) {
      window.location.href = "https://linkedin.com";
    }

    // Check for company page
    if (/\/company\//.test(pathname)) {
      const ppav = document.querySelector(
        ".scaffold-layout__aside[aria-label='Advertisement']"
      );
      if (ppav) {
        ppav.style.display = "none";
      }
    }

    // Check for recent activity
    if (
      /^\/in\/[a-zA-Z0-9-]+\/recent-activity\/(comments|reactions|all)\/$/.test(
        pathname
      ) &&
      isToggleActive
    ) {
      const targetNode = document.querySelector(".scaffold-layout__sidebar");
      if (targetNode) {
        console.log("Target node found");
        if (!isStopwatchRunning) {
          startStopwatch();
        }
      }
    }

    if (
      /^\/in\/[a-zA-Z0-9-]+\/recent-activity\/(comments|reactions|all)\/$/.test(
        pathname
      ) &&
      !isToggleActive
    ) {
      window.location.href = "https://linkedin.com";
    }

    // Check for search results
    if (/^\/search\/results\/all/.test(pathname)) {
      const targetNode = document.querySelector(
        ".scaffold-layout__aside[aria-label='Search suggestions']"
      );
      if (targetNode) {
        targetNode.style.display = "none";
      }
    }
  });
}, 1000); // Check every 1 second

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
