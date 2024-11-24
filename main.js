// Funktion zur Anpassung der URL-Prüfung
function removeElements() {
  startPoints();

  // Überprüfung auf Notifications
  if (
    window.location.hostname === "www.linkedin.com" &&
    window.location.pathname.startsWith("/notifications")
  ) {
    window.location.href = "https://www.linkedin.com/";
  }

  // Überprüfung auf Feed
  if (window.location.href.includes("linkedin.com/feed/")) {
    const promoAd = document.querySelector(".update-components-promo");
    if (promoAd) {
      promoAd.style.display = "none";
    }
    togglePostsWithHeader();
  }

  // Überprüfung auf "Mynetwork"
  else if (window.location.href.includes("linkedin.com/mynetwork/")) {
    mynetwork();
  }

  // Überprüfung auf Profil
  else if (window.location.href.startsWith("https://www.linkedin.com/in")) {
    profile();
  }

  // Überprüfung auf Gruppen
  else if (window.location.href.includes("linkedin.com/groups/")) {
    const recommendedGroups = document.querySelector(
      'aside.scaffold-layout__aside[aria-label="Groups you might be interested in"]'
    );
    if (recommendedGroups) {
      recommendedGroups.remove();
    }
  }
}

// MutationObserver zur Beobachtung von DOM-Änderungen
const observer = new MutationObserver(removeElements);
observer.observe(document.body, { childList: true, subtree: true });

// Sofortige Ausführung der Funktion
removeElements();

// Select the nav element with the specified aria-label
const nav = document.querySelector('nav[aria-label="Primary Navigation"]');

// Check if the nav element exists
if (nav) {
  // Find the first ul inside the nav
  const ul = nav.querySelector("ul");

  // Check if the ul element exists
  if (ul) {
    // Select the first li inside the ul
    const firstLi = ul.querySelector("li");

    // Check if the first li exists
    if (firstLi) {
      // Add a click event listener to the first li
      firstLi.addEventListener("click", function () {
        // Redirect to LinkedIn
        window.location.href = "https://www.linkedin.com";
      });
    }
  }
}

// Wähle das div mit der Klasse "global-nav__content"
const navContent = document.querySelector("div.global-nav__content");

// Überprüfen, ob das div existiert
if (navContent) {
  // Wähle das erste Anker-Element (a) innerhalb des divs
  const anchor = navContent.querySelector("a");

  // Überprüfen, ob das Anker-Element existiert
  if (anchor) {
    // Füge einen Click-Event-Listener hinzu
    anchor.addEventListener("click", function (event) {
      // Verhindere die Standardaktion des Links
      event.preventDefault();
      // Leite den Benutzer zu LinkedIn weiter
      window.location.href = "https://www.linkedin.com";
    });
  }
}
