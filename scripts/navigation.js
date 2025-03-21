function navigation() {
  // Remove notifications tab ¦¦ Only valid for profile and feed
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
  // Red Dot at home icon
  const redDot = document.querySelector(".notification-badge");
  if (redDot) {
    redDot.style.display = "none";
  }
}
