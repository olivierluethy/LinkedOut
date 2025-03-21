function profile() {
  console.log("You're inside of profile");
  const aside = document.querySelector("aside");
  const childrenToHide = [3, 4, 5, 6];

  childrenToHide.forEach((index) => {
    if (aside.children[index]) {
      aside.children[index].style.display = "none";
    }
  });
}
