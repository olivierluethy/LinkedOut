"use strict";

function updateToggleText(toggleState) {
  const toggleElement = document.getElementById("toggOnOff");
  const switchElement = document.querySelector(".switch");
  toggleElement.innerHTML = toggleState
    ? "<strong>On</strong>"
    : "<strong>Off</strong>";

  switchElement.title = toggleState
    ? "View the content of the accounts you have subscribed to"
    : "Don't view the content of accounts you have subscribed to.";
}

document.addEventListener("DOMContentLoaded", () => {
  const checkboxSubs = document.getElementById("checkbox-subs");

  // Initialen Wert aus dem Storage abrufen
  chrome.storage.local.get(["toggleState"], (res) => {
    const toggleState = res.toggleState ?? false; // Setzt auf false, wenn nicht gesetzt
    checkboxSubs.checked = toggleState;
    updateToggleText(toggleState);
  });

  // Event Listener für Änderungen an der Checkbox
  checkboxSubs.addEventListener("change", () => {
    const isChecked = checkboxSubs.checked;
    chrome.storage.local.set({ toggleState: isChecked }); // Speichern in Storage
    updateToggleText(isChecked); // Aktualisiere den Text sofort
  });
});
