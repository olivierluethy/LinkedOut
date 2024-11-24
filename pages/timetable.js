chrome.storage.local.get("wastedTime", function (data) {
  const wastedTime = data.wastedTime || {}; // Lade gespeicherte Daten oder initialisiere ein leeres Objekt
  const tableBody = document.getElementById("logTableBody");

  // Vorherige Tabellenzeilen leeren
  tableBody.innerHTML = "";

  // Aktuelles Datum im Format YYYY-MM-DD für den Vergleich
  const today = new Date().toISOString().split("T")[0];

  // Dynamisches Update der Zeit für den heutigen Tag
  function updateTodayTime() {
    chrome.storage.local.get("wastedTime", (res) => {
      const wastedTime = res.wastedTime || {}; // Stelle sicher, dass wastedTime immer aktuell ist
      const todayTime = wastedTime[today] || "00:00:00"; // Fallback-Wert, wenn nichts für heute vorhanden ist

      // Suchen der Zeile mit dem heutigen Datum
      const rows = tableBody.getElementsByTagName("tr");
      let todayRowFound = false;

      for (let row of rows) {
        const dateCell = row.cells[0]; // Die erste Zelle enthält das Datum
        if (
          dateCell &&
          dateCell.textContent ===
            new Intl.DateTimeFormat("de-DE", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }).format(new Date(today))
        ) {
          const timeCell = row.cells[1]; // Die zweite Zelle enthält die Zeit
          timeCell.textContent = todayTime; // Aktualisiere die Zeitzelle mit der aktuellen Zeit
          todayRowFound = true;
          break;
        }
      }

      // Wenn keine Zeile für den heutigen Tag gefunden wurde, fügen wir sie hinzu
      if (!todayRowFound) {
        const row = document.createElement("tr");

        // Datum im gewünschten Format formatieren
        const formattedDate = new Intl.DateTimeFormat("de-DE", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(new Date(today));

        // Erstes Tabellenfeld: Datum
        const dateCell = document.createElement("td");
        dateCell.style.padding = "10px";
        dateCell.textContent = formattedDate; // Formatiertes Datum einfügen

        // Zweites Tabellenfeld: Zeit
        const timeCell = document.createElement("td");
        timeCell.style.padding = "10px";
        timeCell.textContent = todayTime; // Zeit als Text einfügen

        // Zeile zusammensetzen und hinzufügen
        row.appendChild(dateCell);
        row.appendChild(timeCell);
        tableBody.appendChild(row);
      }
    });
  }

  // Initialer Aufruf und Update alle 1 Sekunde
  updateTodayTime();
  setInterval(updateTodayTime, 1000);

  // Prüfe, ob es überhaupt Daten gibt
  if (Object.keys(wastedTime).length === 0) {
    // Keine Daten, zeige eine Nachricht an
    const noDataMessage = document.createElement("tr");
    const messageCell = document.createElement("td");
    messageCell.colSpan = 2; // Beide Spalten kombinieren
    messageCell.style.padding = "10px";
    messageCell.textContent = "You haven't wasted any time yet"; // Text anzeigen

    noDataMessage.appendChild(messageCell);
    tableBody.appendChild(noDataMessage);
  } else {
    // Sortiere die Daten nach Datum (falls nötig)
    const sortedDates = Object.keys(wastedTime).sort();

    // Tabelle mit Daten befüllen
    sortedDates.forEach((date) => {
      const row = document.createElement("tr");

      // Datum im gewünschten Format formatieren
      const formattedDate = new Intl.DateTimeFormat("de-DE", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(date));

      // Erstes Tabellenfeld: Datum
      const dateCell = document.createElement("td");
      dateCell.style.padding = "10px";
      dateCell.textContent = formattedDate; // Formatiertes Datum einfügen

      // Zweites Tabellenfeld: Zeit
      const timeCell = document.createElement("td");
      timeCell.style.padding = "10px";
      timeCell.textContent = wastedTime[date]; // Zeit als Text einfügen

      // Zeile zusammensetzen und hinzufügen
      row.appendChild(dateCell);
      row.appendChild(timeCell);
      tableBody.appendChild(row);
    });
  }
});
