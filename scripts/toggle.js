// Stopwatch Management
let stopwatchInterval,
  seconds = 0,
  minutes = 0,
  hours = 0,
  isStopwatchRunning = false;
let lastLoggedSeconds = 0;

const formatTime = (h, m, s) =>
  `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s
    .toString()
    .padStart(2, "0")}`;
const timeToSeconds = (time) =>
  time
    .split(":")
    .map(Number)
    .reduce((acc, val, i) => acc + val * [3600, 60, 1][i], 0);
const secondsToTime = (total) =>
  formatTime(
    Math.floor(total / 3600),
    Math.floor((total % 3600) / 60),
    total % 60
  );

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

  const timeString = formatTime(hours, minutes, seconds);
  console.log(timeString);
  storeWastedTime();
}

function startStopwatch() {
  if (!isStopwatchRunning) {
    isStopwatchRunning = true;
    stopwatchInterval = setInterval(updateStopwatch, 1000);
    console.log("Stopwatch started");
  }
}

function stopStopwatch() {
  if (isStopwatchRunning) {
    clearInterval(stopwatchInterval);
    isStopwatchRunning = false;
    storeWastedTime();
    console.log("Stopwatch stopped");
  }
}

function initializeStopwatch() {
  const today = new Date().toISOString().split("T")[0];
  chrome.storage.local.get(["wastedTime"], ({ wastedTime = {} }) => {
    const savedTime = wastedTime[today] || "00:00:00";
    const totalSeconds = timeToSeconds(savedTime);
    hours = Math.floor(totalSeconds / 3600);
    minutes = Math.floor((totalSeconds % 3600) / 60);
    seconds = totalSeconds % 60;
    lastLoggedSeconds = totalSeconds;
    console.log(`Stopwatch initialized with: ${savedTime}`);
  });
}

function storeWastedTime() {
  const { href, pathname } = window.location;
  const isTrackedPage =
    href.includes("linkedin.com/feed/") ||
    /^\/in\/[a-zA-Z0-9-]+\/recent-activity\/(comments|reactions|all)\/$/.test(
      pathname
    ) ||
    /\/company\/.*?\/posts\//.test(pathname);

  if (!isTrackedPage) return;

  const today = new Date().toISOString().split("T")[0];
  const currentTime = hours * 3600 + minutes * 60 + seconds;
  const deltaTime = currentTime - lastLoggedSeconds;

  if (deltaTime >= 1) {
    chrome.storage.local.get(["wastedTime"], ({ wastedTime = {} }) => {
      const previousTime = timeToSeconds(wastedTime[today] || "00:00:00");
      wastedTime[today] = secondsToTime(previousTime + deltaTime);
      chrome.storage.local.set({ wastedTime }, () => {
        console.log("Updated wastedTime:", wastedTime);
        lastLoggedSeconds = currentTime;
      });
    });
  } else {
    stopStopwatch();
  }
}

// DOM Helpers
const hideElement = (selector) => {
  const el = document.querySelector(selector);
  if (el) el.style.display = "none";
};

const setVisibility = (selector, visible) => {
  const el = document.querySelector(selector);
  if (el) el.style.visibility = visible ? "visible" : "hidden";
};

// Toggle Functionality
let contentAlreadyThere = 0;

function toggleFunctionality(isToggleActive) {
  const { href, pathname } = window.location;

  // Redirect if toggle is off for specific pages
  if (
    !isToggleActive &&
    (/^\/in\/[a-zA-Z0-9-]+\/recent-activity\/(comments|reactions|all)\/$/.test(
      pathname
    ) ||
      /\/company\/.*?\/posts\//.test(pathname))
  ) {
    window.location.href = "https://linkedin.com";
    return;
  }

  // Handle tracked pages
  const isTrackedPage =
    href.includes("linkedin.com/feed/") ||
    /^\/in\/[a-zA-Z0-9-]+\/recent-activity\/all\/$/.test(pathname) ||
    /\/company\/.*?\/posts\//.test(pathname);

  if (isTrackedPage) {
    hideElement(".update-components-promo");
    const contentVisible = isToggleActive || contentAlreadyThere === 1;
    setVisibility(".relative", contentVisible);

    if (contentVisible) {
      if (!isStopwatchRunning) startStopwatch();
      if (!isToggleActive) stopStopwatch();
      if (isToggleActive && contentAlreadyThere === 0) handleHomeFeed();
      initializeStopwatch();
    } else {
      stopStopwatch();
      initializeStopwatch();
    }
  } else {
    stopStopwatch();
    initializeStopwatch();
  }
}

// Feed Handling
let alertDisplay = 0;

function handleHomeFeed() {
  console.log("You're inside of feed");
  chrome.storage.local.get(["toggleState"], ({ toggleState = false }) => {
    if (!toggleState) return;

    if (alertDisplay === 0) alertDisplay++;

    const contentContainer = document.querySelector(".relative");
    if (!contentContainer) return;

    document
      .querySelectorAll("[data-view-name='feed-full-update']")
      .forEach((el) => {
        if (el.querySelector(".update-components-header__text-wrapper"))
          el.remove();
      });

    hideElement(
      "button.artdeco-button.artdeco-button--secondary.mv5.t-14.t-black.t-normal"
    );
  });
}

// Initialization
chrome.storage.local.get(["toggleState"], ({ toggleState = false }) => {
  toggleFunctionality(toggleState);
  if (toggleState) contentAlreadyThere = 1;
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.toggleState) toggleFunctionality(changes.toggleState.newValue);
});
