function handleMyNetwork() {
  console.log("Your inside of Network");

  // Accessing the root element
  const root = document.getElementById("root");

  if (root) {
    // Safely access the logo element, checking each child level
    const logo =
      root.children[3]?.children[0]?.children[0]?.children[0]?.children[0]
        ?.children[0];

    // Safely access the home icon element, checking each child level
    const homeIcon =
      root.children[3]?.children[0]?.children[0]?.children[0]?.children[0]
        ?.children[2]?.children[0]?.children[0]?.children[0]?.children[0];

    // Event listener for the logo click to reload the page
    if (logo) {
      logo.addEventListener("click", () => {
        console.log("Logo clicked, reloading page in 1 second.");

        // Wait for 1 second before reloading the page
        setTimeout(() => {
          window.location.reload();
        }, 1000); // 1000 milliseconds = 1 second
      });
    } else {
      console.log("Logo element not found.");
    }

    // Event listener for the home icon click to reload the page
    if (homeIcon) {
      homeIcon.addEventListener("click", () => {
        console.log("Home icon clicked, reloading page.");
        // Wait for 1 second before reloading the page
        setTimeout(() => {
          window.location.reload();
        }, 1000); // 1000 milliseconds = 1 second
      });
    } else {
      console.log("Home icon element not found.");
    }
  } else {
    console.log("Root element not found.");
  }

  const ad = document.querySelector("iframe[title='Advertisement']");
  if (ad) {
    ad.style.display = "none";
  }
  /* Remove the LinkedIn Premium Add to Grow Network Smarter and the entire network suggestions with suggested people. */
  // Get the container element
  const container = document.querySelector(
    "div[data-view-name='cohorts-list']"
  );

  if (container) {
    const nextContainer = container.firstElementChild; // Easier access to the first child

    if (nextContainer) {
      // Loop through the rest of the children and hide them
      Array.from(nextContainer.children).forEach((child, index) => {
        if (index > 0) child.style.display = "none"; // Hide all except the first
      });
    }
  }

  const nav = document.querySelector("nav");
  if (nav && nav.children[0]) {
    let stage = nav.children[0];

    // For gathering the red dot
    let dot = stage;
    if (
      dot.children[0] &&
      dot.children[0].children[0] &&
      dot.children[0].children[0].children[0] &&
      dot.children[0].children[0].children[0].children[1]
    ) {
      dot = dot.children[0].children[0].children[0].children[1];
      dot.style.display = "none";
    } else {
      console.warn("Red dot element not found in the expected structure");
    }

    // For gathering notifications icon
    if (stage.children[4]) {
      let notification = stage.children[4];
      notification.style.display = "none";
    } else {
      console.warn("Notification icon not found at index 4");
    }

    // For gathering the try premium advertisement
    let parentStage = nav.parentElement && nav.parentElement.parentElement;
    if (
      parentStage &&
      parentStage.children[1] &&
      parentStage.children[1].children[0] &&
      parentStage.children[1].children[0].children[1] &&
      parentStage.children[1].children[0].children[1].children[0] &&
      parentStage.children[1].children[0].children[1].children[0].children[1]
    ) {
      stage =
        parentStage.children[1].children[0].children[1].children[0].children[1];
      stage.style.display = "none";
    } else {
      console.warn(
        "Try Premium advertisement not found in the expected structure"
      );
    }
  } else {
    console.warn("Nav element or its first child not found");
  }
}
