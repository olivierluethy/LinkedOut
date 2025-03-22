function profile() {
  console.log("You're inside of profile");

  // If exist, your sitting within your own profile
  const profileSection = document.querySelector(".pv-profile-info-section");

  // Überprüfung, ob das Element existiert
  if (profileSection) {
    console.log(
      "Du befindest dich in deinem eigenen Profil ('.pv-profile-info-section' gefunden)."
    );
    const aside = document.querySelector("aside");
    const childrenToHide = [3, 4, 5, 6];

    childrenToHide.forEach((index) => {
      if (aside.children[index]) {
        aside.children[index].style.display = "none";
      }
    });
  } else {
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
