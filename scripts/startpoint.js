function startPoints() {
  /* Remove try premium on sidenav */
  // Select the parent div
  const feedIdentityModule = document.querySelector(
    ".feed-identity-module.artdeco-card.overflow-hidden.mb2"
  );
  if (feedIdentityModule) {
    // Remove the 3rd element (a div)
    const thridElement = feedIdentityModule.children[2];
    if (thridElement) {
      thridElement.remove();
    }
  }
  // Remove Try Premium for CHF0 on left navigation bar
  const promo = document.querySelector(
    "div[role='region'][aria-label='Side Bar']"
  ).children[2];
  if (promo) {
    promo.style.display = "none";
  }
  const main = document.querySelector("main[aria-label='Main Feed']")
    .children[1];
  if (main) {
    main.style.visibility = "hidden";
  }

  // Remove red button over home house button
  const redButtonHouse = document.querySelector(
    ".notification-badge.notification-badge--show "
  );
  if (redButtonHouse) {
    redButtonHouse.style.display = "none";
  }
  // Die Funktion aufrufen, um nach dem Angebot zu suchen
  const hasOffer = checkForPremiumOffer();

  if (hasOffer) {
    console.log("Premium-Angebot gefunden und entfernt!");
  } else {
    console.log("Premium-Angebot nicht gefunden.");
  }
}
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
