// Funktion zur Anpassung der URL-Prüfung
function removeElements() {
  startPoints();

  // Check inside the entire body element if there is an element with the content of "Try 1 month of Premium for CHF0"
  function checkForPremiumOffer() {
    // Alle Paragraphen im Dokument durchgehen
    const allParagraphs = document.querySelectorAll("p");

    for (let i = 0; i < allParagraphs.length; i++) {
      // Überprüfen, ob der Paragraph den gewünschten Text enthält
      if (
        allParagraphs[i].textContent.includes("Try 1 month of Premium for CHF0")
      ) {
        // Nächstes div-Element, das diesen Paragraphen enthält, finden
        const parentDiv = allParagraphs[i].closest("div");

        if (parentDiv) {
          // Das div-Element entfernen
          parentDiv.remove();
          return true; // Angebot gefunden und entfernt
        }
      }
    }

    return false; // Angebot nicht gefunden
  }

  // Die Funktion aufrufen, um nach dem Angebot zu suchen
  const hasOffer = checkForPremiumOffer();

  if (hasOffer) {
    console.log("Premium-Angebot gefunden und entfernt!");
  } else {
    console.log("Premium-Angebot nicht gefunden.");
  }

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

    /* Removing Nav Elements */

    // Get the nav element with the class "en2g8a0"
    const navElement = document.querySelector(".en2g8a0");

    // Home Red Icon for Notification --
    // Get the first li element
    const firstLi = navElement.querySelector("ul li:nth-child(1)");

    // Get the nested span element within the first li
    const targetSpan = firstLi.querySelector("a span span");

    // Do something with the target span, for example, change its text content
    targetSpan.style.visibility = "hidden";

    // Notification clock --
    // Get the 5th li element within the ul element inside the nav element
    const fifthLi = navElement.querySelector("ul li:nth-child(5)");

    // Set the visibility style of the 5th li element to "hidden"
    fifthLi.style.visibility = "hidden";

    // Try premium
    // Get the element with the data-view-name attribute
    const targetElement = document.querySelector(
      '[data-view-name="premium-nav-upsell-text"]'
    );

    // Do something with the target element, for example, change its text content
    targetElement.style.visibility = "hidden";
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
