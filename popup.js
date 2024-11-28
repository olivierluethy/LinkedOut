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

  // Dynamisches Update der Zeit
  const today = new Date().toISOString().split("T")[0]; // Hol das heutige Datum im Format YYYY-MM-DD

  function updateTodayTime() {
    chrome.storage.local.get(["wastedTime"], (res) => {
      const wastedTime = res.wastedTime || {};
      const todayTime = wastedTime[today] || "No time spent today"; // Fallback-Wert, wenn nichts für heute vorhanden ist
      if (todayTime == "No time spent today") {
        document.getElementById("timeOfConsumption").innerHTML = `${todayTime}`;
      } else {
        document.getElementById(
          "timeOfConsumption"
        ).innerHTML = `Time spent today: ${todayTime}`;
      }
    });
  }

  // Update alle 1 Sekunde
  updateTodayTime(); // Initialer Aufruf
  setInterval(updateTodayTime, 1000);
});
document
  .getElementById("timeOfConsumption")
  .addEventListener("click", function () {
    chrome.tabs.create({ url: chrome.runtime.getURL("/pages/timetable.html") });
  });
document.getElementById("goToFAQ").addEventListener("click", function () {
  chrome.tabs.create({ url: chrome.runtime.getURL("/pages/FAQ.html") });
});
