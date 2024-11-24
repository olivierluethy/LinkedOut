function startPoints() {
  // Überprüfe, ob der Titel Benachrichtigungen enthält und entferne sie
  if (/\(\d+\)/.test(document.title)) {
    document.title = document.title.replace(/\s*\(\d+\)/g, "");
  }
  // Remove notifications tab
  const notifyClock = document.querySelector(
    '.global-nav__nav[aria-label="Primary Navigation"] ul.global-nav__primary-items li:nth-child(5)'
  );
  if (notifyClock) {
    notifyClock.style.visibility = "hidden";
  }

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
}
