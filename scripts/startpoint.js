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

  // Remove try premium on sidenav
  const ankerTitle = document.querySelector(
    "h3.t-12.t-black--light.t-normal.pb1"
  );
  if (ankerTitle) {
    ankerTitle.style.display = "none";
  }

  const anchorElements = document.querySelectorAll(
    "a.NPeUJbjVPXndTVsyUknZWJrJZHpYopPJegGc.link-without-visited-state.feed-identity-module__anchored-widget.feed-identity-module__anchored-widget--premium-upsell.t-12.t-black.t-bold.link-without-hover-state.text-align-left.premium-upsell-link--long"
  );

  // Loop through the NodeList and remove each element
  anchorElements.forEach((anchor) => {
    anchor.remove();
  });

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
