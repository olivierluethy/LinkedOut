function mynetwork() {
  // Remove notifications tag separatly
  const navElement = document.querySelector("nav.en2g8a0");
  const liElements = navElement.querySelectorAll("li");

  if (liElements.length >= 5) {
    liElements[4].remove(); // Remove the fifth element (index 4)
  }

  // Target the main container with class "cnuthtao" and data-view-name="cohorts-list"
  const mainContainer = document.querySelector(
    ".cnuthtao[data-view-name='cohorts-list']"
  );

  // Find all section elements within the main container
  const sectionsToRemove = mainContainer.querySelectorAll("section");

  // Iterate through each section and remove it, except for sections within the "invitation-preview" container
  sectionsToRemove.forEach((section) => {
    // Check if the section is inside the "invitation-preview" container
    if (!section.closest(".cnuthtao[data-view-name='invitation-preview']")) {
      section.remove();
    }
  });

  // Remove related connection to just accepted connection
  const relatedConnect = document.querySelector(
    "ul.artdeco-card.mb4.overflow-hidden"
  );
  if (relatedConnect) {
    relatedConnect.remove();
  }

  // Remove connection recommendations
  const networkGrow = document.querySelector(
    ".scaffold-finite-scroll__content"
  );
  if (networkGrow) {
    networkGrow.remove();
  }

  // Remove suggested people after connecting with someone
  const connSomeone = document.querySelector(".mn-suggester.artdeco-card");
  if (connSomeone) {
    connSomeone.remove();
  }

  // Remove show more button
  const showMore = document.querySelector(
    '[data-launchpad-scroll-anchor="pymk"]'
  );
  if (showMore) {
    showMore.remove();
  }

  const button = document.querySelector(
    ".scaffold-finite-scroll.scaffold-finite-scroll--finite"
  );
  if (button) {
    button.remove();
  }
}
