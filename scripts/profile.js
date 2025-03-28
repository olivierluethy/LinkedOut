function profile() {
  console.log("You're inside of profile");

  // If exist, your sitting within your own profile
  const profileSection = document.querySelector(".pv-profile-info-section");

  // Überprüfung, ob das Element existiert
  if (profileSection) {
    console.log("Du befindest dich in deinem eigenen Profil.");
    // Überprüfen, ob das übergeordnete Element existiert, bevor auf die Kinder zugegriffen wird
    const globalNavContent = document.querySelector(".global-nav__content");

    // Sicherstellen, dass das übergeordnete Element existiert
    if (globalNavContent) {
      const icon = globalNavContent.children[0]; // Das erste Kind
      const homeIcon = globalNavContent.children[2]?.children[0]?.children[0]; // Das Home-Icon

      // Event-Listener für das erste Icon
      if (icon) {
        icon.addEventListener("click", () => {
          console.log("Erstes Icon wurde geklickt, Seite wird neu geladen.");
          window.location.reload();
        });
      } else {
        console.log("Erstes Icon nicht gefunden.");
      }

      // Event-Listener für das Home-Icon
      if (homeIcon) {
        homeIcon.addEventListener("click", () => {
          console.log("Home-Icon wurde geklickt, Seite wird neu geladen.");
          window.location.reload();
        });
      } else {
        console.log("Home-Icon nicht gefunden.");
      }
    } else {
      console.log("Das Element .global-nav__content wurde nicht gefunden.");
    }

    const aside = document.querySelector("aside");
    const childrenToHide = [3, 4, 5, 6];

    childrenToHide.forEach((index) => {
      if (aside.children[index]) {
        aside.children[index].style.display = "none";
      }
    });
  } else {
    console.log("Du befindest dich in einem anderen Profil.");
    // Überprüfen, ob das übergeordnete Element existiert, bevor auf die Kinder zugegriffen wird
    const globalNavContent = document.querySelector(".global-nav__content");

    // Sicherstellen, dass das übergeordnete Element existiert
    if (globalNavContent) {
      const icon = globalNavContent.children[0]; // Das erste Kind
      const homeIcon = globalNavContent.children[2]?.children[0]?.children[0]; // Das Home-Icon

      // Event-Listener für das erste Icon
      if (icon) {
        icon.addEventListener("click", () => {
          console.log("Erstes Icon wurde geklickt, Seite wird neu geladen.");
          window.location.reload();
        });
      } else {
        console.log("Erstes Icon nicht gefunden.");
      }

      // Event-Listener für das Home-Icon
      if (homeIcon) {
        homeIcon.addEventListener("click", () => {
          console.log("Home-Icon wurde geklickt, Seite wird neu geladen.");
          window.location.reload();
        });
      } else {
        console.log("Home-Icon nicht gefunden.");
      }
    } else {
      console.log("Das Element .global-nav__content wurde nicht gefunden.");
    }

    console.log(
      "'.pv-profile-info-section' nicht gefunden, du bist nicht in deinem Profil."
    );
    const profilesToFollow = document.querySelector(
      "aside.scaffold-layout__aside"
    );
    if (profilesToFollow) {
      profilesToFollow.style.display = "none";
    }
  }
}
