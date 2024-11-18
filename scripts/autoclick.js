let intervalId; // Variable zur Speicherung der Interval-ID

function autoClick() {
  const button = document.querySelector(
    "button.artdeco-button.artdeco-button--muted.artdeco-button--1.artdeco-button--full.artdeco-button--secondary.ember-view.scaffold-finite-scroll__load-button"
  );

  if (button) {
    // Speichern Sie die aktuelle Scroll-Position
    const originalScrollY = window.scrollY;

    // Speichern Sie die Höhe des gesamten Dokuments vor dem Klick
    const originalDocumentHeight = document.body.scrollHeight;

    // Klicken Sie auf den Button
    button.click();

    // Überwachen Sie Änderungen im DOM mit einem MutationObserver
    const observer = new MutationObserver(() => {
      // Berechnen Sie die neue Höhe des Dokuments
      const newDocumentHeight = document.body.scrollHeight;
      const heightDifference = newDocumentHeight - originalDocumentHeight;

      // Wenn neue Inhalte geladen wurden, stellen Sie die Scrollposition relativ zur neuen Höhe wieder her
      if (heightDifference > 0) {
        window.scrollTo(0, originalScrollY + heightDifference);
      }

      // Beenden Sie die Beobachtung, nachdem der Scroll-Versatz angewendet wurde
      observer.disconnect();
    });

    // Konfigurieren und starten Sie den MutationObserver
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
}

// Funktion zum Starten des Auto-Clickers
function startAutoClick() {
  if (!intervalId) {
    // Überprüfen, ob bereits ein Intervall läuft
    intervalId = setInterval(autoClick, 1000); // Startet das Intervall
  }
}

// Funktion zum Stoppen des Auto-Clickers
function stopAutoClick() {
  clearInterval(intervalId); // Stoppt das Intervall
  intervalId = null; // Setzt die ID zurück
}
